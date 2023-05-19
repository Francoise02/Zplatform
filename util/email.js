import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(filename);

class Email {
  constructor(user, url, message, rootDir) {
    this.to = user.email;
    this.firstName = user.name;
    this.userId = user._id;
    this.url = url;
    this.rootDir = rootDir;
    this.message = message;
    this.from = `Company Z <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject, title) {
    // 1) Render HTML based on a ejs template
    const html = await ejs.renderFile(
      `${__dirname}/../views/email/${template}.ejs`,
      {
        firstName: this.firstName,
        url: this.url,
        message: this.message,
        userId: this.userId,
        rootDir: this.rootDir,
        subject,
      }
    );
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: html,
    };
    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    if (process.env.NODE_ENV !== 'test') {
      await this.send('welcome', "🤓 Welcome to Company Z!");
    }
  }

  async sendPasswordReset() {
    await this.send(
      'passwordreset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  async sendFeedback() {
    await this.send('feedback', 'Company Z feedback');
  }
}

export default Email;
