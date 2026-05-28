// api/contact.example.js
// ─────────────────────────────────────────────────────────────
// Vercel Serverless Function — Contact Form Handler
//
// SETUP:
//   1. Rename this file to: api/contact.js
//   2. Install nodemailer:  npm install nodemailer
//   3. Add environment variables in Vercel dashboard:
//      SMTP_HOST     — e.g. smtp.gmail.com
//      SMTP_PORT     — e.g. 587
//      SMTP_USER     — your sending email address
//      SMTP_PASS     — your email password or app-specific password
//      CONTACT_EMAIL — where to receive contact form submissions
//
//   4. In js/main.js set:
//      const FORM_ENDPOINT = '/api/contact';
// ─────────────────────────────────────────────────────────────

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from:    `"${name}" <${process.env.SMTP_USER}>`,
      to:      process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: subject || `New message from ${name}`,
      text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html:    `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || '—'}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
