import React, { useState } from 'react';
import STLModel from './STLModel';
import './styles/CustomOrderForm.css';

const CustomOrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    filament: '',
    color: '',
    quality: '',
    quantity: 1,
    file: null,
    message: ''
  });

  const [file, setFile] = useState(null);
  const [volume, setVolume] = useState(0); // σε mm³
  const [price, setPrice] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const computePrice = (vol) => {
    const volumeCm3 = vol / 1000;
    const pricePerCm3 = 0.15;
    const packaging = 0.6;

    const qualityMultiplier = {
      Low: 1.0,
      Medium: 1.3,
      High: 1.6,
    };

    const multiplier = qualityMultiplier[formData.quality] || 1;
    const total =
      (volumeCm3 * pricePerCm3 * multiplier + packaging) *
      Number(formData.quantity);

    setVolume(volumeCm3);
    setPrice(total);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    for(const key in formData) {
      if(formData[key]) data.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://contact-backend-qxro.onrender.com/contact', {
        method: 'POST',
        body: data
      });

      if(response.ok) {
        alert('The order has been sent successfully! We will get back to you soon.');
      } else {
        alert('Something went wrong, please try again.');
      }
    } catch (error) {
      alert('Error sending the form. Please try again later.');
    }
  };

  return (
    <section className="custom-order-section">
      <h2>Custom 3D Print Order</h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="custom-order-form"
      >
        <div className="form-content">
          <img src="../public/images/printer.jpg" alt="3d printer" className='form-image' />
          <div className="form-fields">
            <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />

            <label>Choose Filament:</label>
            <select name="filament" required value={formData.filament} onChange={handleChange}>
              <option value="">Select filament</option>
              <option value="PLA">PLA</option>
            </select>

            <label>Choose Color:</label>
            <select name="color" required value={formData.color} onChange={handleChange}>
              <option value="">Select color</option>
              <option value="white">White</option>
              <option value="grey">Grey</option>
              <option value="green">Green</option>
              <option value="black">Black</option>
              <option value="purple">Purple</option>
              <option value="red">Red</option>
            </select>

            <label>Print Quality:</label>
            <select name="quality" required value={formData.quality} onChange={handleChange}>
              <option value="">Select resolution</option>
              <option value="Standard (0.2mm)">Standard (0.2mm)</option>
              <option value="High (0.1mm)">High (0.1mm)</option>
              <option value="Draft (0.3mm)">Draft (0.3mm)</option>
            </select>

            <label>Quantity:</label>
            <input type="number" name="quantity" min="1" required value={formData.quantity} onChange={handleChange} />

            <label>Upload STL file:</label>
            <input type="file" accept=".stl" onChange={handleFileChange} required />

            <textarea name="message" placeholder="Any notes or dimensions?" rows="4" value={formData.message} onChange={handleChange} />

            <button type="submit">Send Order</button>
          </div>
        </div>
      </form>

      {file && (
        <>
          <STLModel file={file} onVolumeComputed={computePrice} />
          <p><strong>Volume:</strong> {volume.toFixed(2)} cm³</p>
          <p><strong>Estimated Cost:</strong> {price.toFixed(2)} €</p>
        </>
      )}

    </section>
  );
};

export default CustomOrderForm;
