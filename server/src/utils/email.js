import nodemailer from 'nodemailer';

export async function sendVerificationEmail(to, link) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@example.com',
    to,
    subject: 'Verify your event registration',
    html: `<p>Thanks for registering!</p>
           <p>Click to verify: <a href="${link}">${link}</a></p>`
  });

  return info.messageId;
}
