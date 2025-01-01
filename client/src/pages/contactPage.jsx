import { useState } from 'react';
import '../styles/ContactPage.css';
import Navbar from '../components/Navbar';

const ContactPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    
    const mailtoLink = `mailto:your-nmonroe.dev@gmail.com?subject=Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;

    
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="contact-page">
        <Navbar />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          Have questions or feedback? Fill out the form below to email us directly.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="contact-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="contact-input"
            placeholder="Your Name"
            required
          />

          <label htmlFor="email" className="contact-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="contact-input"
            placeholder="Your Email"
            required
          />

          <label htmlFor="message" className="contact-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="contact-textarea"
            placeholder="Your Message"
            rows="5"
            required
          ></textarea>

          <button type="submit" className="contact-button">
            Send Message
          </button>
        </form>
      </div>

     
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Thank you for your message! We'll get back to you soon.</p>
            <button onClick={closePopup} className="popup-close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
