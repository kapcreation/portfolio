import React, { useEffect, useState } from 'react';
import './ContactForm.scss'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from '@formspree/react';

const ContactForm = ({ onClose, onSubmit }) => {
  const [state, handleSubmit] = useForm('xgebepzn', { 
    data: { subject: 'KAP Portfolio - New contact form submission' }
  })

  const handleClose = () => {
    onClose && onClose()
  }

  useEffect(() => {
    if (state.succeeded) {
      onSubmit && onSubmit()
      handleClose()
    }
  }, [state])

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
            required
          />
        </div>
        <div>
          <label htmlFor="emailInput">Email:</label>
          <input
            type="email"
            name="email"
            id='emailInput'
            required
          />
        </div>
        <div>
          <label htmlFor="messageInput">Message:</label>
          <textarea
            rows={8}
            name="message"
            id='messageInput'
            required
          />
        </div>
        <button type="submit" disabled={state.submitting}>{!state.submitting ? 'Send' : 'Sending...'}</button>
      </form>

      <button onClick={handleClose} className='close'>
        <CloseIcon />
      </button>
    </div>
  );
}

export default ContactForm