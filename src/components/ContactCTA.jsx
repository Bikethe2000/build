// ContactCTA.jsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './styles/ContactCTA.css';

const ContactCTA = () => {
  const [sent, setSent] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_n8w3nzd',     // <- change this
      'template_zkedogz',    // <- change this
      form.current,
      'N1xqcBj1OvEJ9kTY_'      // <- change this
    )
    .then(() => {
      setSent(true);
      form.current.reset();
      setTimeout(() => setSent(false), 4000);
    })
    .catch((error) => {
      console.error('Email error:', error);
      alert('Something went wrong. Please try again.');
    });
  };

  return (
    <section className="contact-section">
      <div className="contact-text">
        <h2>Have a print idea?</h2>
        <p>Send us a message and we’ll get back to you as soon as possible.</p>
      </div>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
        <button type="submit">Request a Quote</button>
        {sent && <p className="sent-msg">✅ Message sent successfully!</p>}
      </form>
    </section>
  );
};

export default ContactCTA;
