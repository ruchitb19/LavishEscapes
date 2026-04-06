
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// NGINX handles frontend static serving
// Removed: app.use(express.static(path.join(__dirname, 'frontend')));

// Email Route for Contact Form
app.post('/send-email', async (req, res) => {
  const { name, email, phone, message, destination } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"LavishEscapes Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `New Inquiry from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Destination: ${destination || 'N/A'}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

// Email Route for Tour Search Form
app.post('/escapes-inquiry', async (req, res) => {
  const { destination, people, checkin, checkout, inquiryDate } = req.body;

  if (!destination || !people || !checkin || !checkout) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"LavishEscapes Tour Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `New Tour Inquiry for ${destination}`,
      text: `
Destination: ${destination}
Number of People: ${people}
Check-in: ${checkin}
Check-out: ${checkout}
Inquiry Date: ${inquiryDate}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Inquiry sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send inquiry email.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
