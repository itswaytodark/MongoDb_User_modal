const Nodemailer = require('nodemailer')
const {EMAIL , PASSWORD} = require('../uitilities/config')

const transporter = Nodemailer.createTransport(
    {
        host:'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }
)

const sendMail = async(to,subject,text,html) => {

    const mail = {
        form: EMAIL,
        to:to,
        subject:subject,
        text:text,
        html:html
    }
    await transporter.sendMail(mail)
}

module.exports = {sendMail}