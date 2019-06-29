import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async(to, username, chatID) => {
  try {
    const msg = {
      to,
      from: 'bukunmiadebisi@gmail.com',
      subject: `Chat Support - Reply ${username}`,
      html: `<strong>${username}<stron/> just contacted chat support, reply him/her ASAP. <br/>
        <strong>Follow this link<strong/><br/><strong>https://chatsupport.netlify.com${chatID}
      `,
    };
    await sgMail.send(msg);
    console.log('Email notification sent successfully')
  } catch(err) {
    console.log(err.message, 'unable to send email')
  }
}

export default sendEmail;