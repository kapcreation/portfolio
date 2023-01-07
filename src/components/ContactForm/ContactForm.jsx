import React, { useState } from 'react';
import './ContactForm.scss'
import CloseIcon from '@mui/icons-material/Close';

const ContactForm = ({ onClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Send form data to server or email here
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleClose = () => {
    onClose && onClose()
  }

  return (
    <div className='contact-form'>
      <h2 className='title'>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nameInput">Name:</label>
          <input
            type="text"
            name="name"
            id='nameInput'
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emailInput">Email:</label>
          <input
            type="email"
            name="email"
            id='emailInput'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="messageInput">Message:</label>
          <textarea
            rows={8}
            name="message"
            id='messageInput'
            value={message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>

      <button onClick={handleClose} className='close'>
        <CloseIcon />
      </button>
    </div>
  );
}

export default ContactForm