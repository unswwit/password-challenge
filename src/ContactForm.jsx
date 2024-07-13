// @ts-nocheck
import React, { useRef, useState } from 'react';
import './styles/ContactUs.css';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactForm = () => {
  const formRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleRecaptcha = (value) => {
    setRecaptchaValue(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const validatePassword = (password) => {
      const regex = /^(?=.*\d{4,}).{10,}$/;
      return regex.test(password);
    };

    if (email === process.env.REACT_APP_EMAIL && password === process.env.REACT_APP_PASSWORD && recaptchaValue) {
      setMessage('');
      emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE,
        formRef.current,
        process.env.REACT_APP_EMAILJS_ID
      ).then(() => {
        alert('Login successful');
        setEmail('');
        setPassword('');
        e.target.reset();
        setRecaptchaValue(null);
      }).catch((error) => {
        console.error('Failed to send email:', error);
        alert('Sorry, an error occurred on our side...');
      });
    } else if (!validatePassword(password)) {
      setMessage('Password must be at least 10 characters long with 4 numbers');
    } else {
      setMessage('Incorrect username or password');
    }
  };

  return (
    <form
      ref={formRef}
      method="post"
      encType="text/plain"
      className="contact-form"
      onSubmit={handleLogin}
    >
      <h3 className="title">Login</h3>
      <input
        className="contact-input"
        type="text"
        name="email"
        placeholder="Email Address*"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        className="contact-input"
        type="password"
        name="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <div className="recaptcha-wrapper">
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        onChange={handleRecaptcha}
      />
      </div>
      <br />
      <input type="submit" className="contact-submit" value="Login" />
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </form>
  );
};

export default ContactForm;
