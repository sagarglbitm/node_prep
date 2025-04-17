
const nodemailer = require('nodemailer');

// Step 1: Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testinghaibhai052@gmail.com',       // Replace with your Gmail
    pass: 'Testinghai12345678' // Use App Password if 2FA enabled
  }
});

// Step 2: Create email options
const mailOptions = {
  from: 'testinghaibhai052@gmail.com',
  to: 'sagarjha8505848114@gmail.com',
  subject: 'Hello from Nodemailer!',
  text: 'This is a test email sent from Node.js using Nodemailer.'
};

// Step 3: Send email
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log('Error occurred:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});

