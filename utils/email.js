const mailer = require('nodemailer')

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};



module.exports = sendEmail