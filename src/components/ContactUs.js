import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css'; // Import your stylesheet here

export default function ContactUs() {
  
  useEffect(() => {
    emailjs.init("gHDv2j1boFBdQTfm3");
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send('get_email', 'tem', formData)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="contact-form">
      <h2 className="contact-form-title">Contact Me!</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} className="input-field" />
        <input type="text" name="subject" placeholder="Subject" onChange={handleChange} className="input-field" />
        <textarea name="message" placeholder="Message" onChange={handleChange} className="input-field"></textarea>
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
  );
}