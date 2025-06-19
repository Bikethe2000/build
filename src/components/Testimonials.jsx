// Testimonials.jsx
import React from 'react';
import './styles/Testimonial.css'; // Assuming you have a CSS file for styling

const testimonials = [
  {
    name: 'John K.',
    text: 'Very kind! Excellent product and packaging!!!',
    avatar: 'https://images1.vinted.net/t/01_00482_6X1TkJkbVRqrFaxePzMuWdMZ/50x50/1747332672.jpeg?s=717e2c1983413a3633f17c84e11dc5d43696f6d3'
  },
  {
    name: 'Helen P.',
    text: 'Very beautiful collaboration!! He had a gift🥹! I highly recommend!😁❤️',
    avatar: 'https://i.pravatar.cc/100?img=32'
  },
  {
    name: 'George E.',
    text: 'Fantastic! 🤩',
    avatar: 'https://images1.vinted.net/t/03_00e43_hdya5qbg8NechZuyd9NwGQK4/f800/1748699993.jpeg?s=dc28b728eecf337c4903ce216a49b9c801c7f64a'
  }
];

const Testimonials = () => (
  <section className="testimonials-section">
    <h2>What they said for us</h2>
    <div className="testimonials-grid">
      {testimonials.map((t, index) => (
        <div className="testimonial-card" key={index}>
          <img src={t.avatar} alt={t.name} />
          <p>"{t.text}"</p>
          <h4>{t.name}</h4>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
