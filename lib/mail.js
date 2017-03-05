import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
  service: `gmail`,
  auth: {
    user: `jgnieuwhof@gmail.com`,
    pass: `03sDg*QXX541`,
  },
})

export default ({ email, subject, message }) => {
  let mailOptions = {
    from: `"Lassie" <noreply@lassie.com>`,
    to: email,
    subject: subject,
    html: `<b>${message}</b>`,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log(`Message %s sent: %s`, info.messageId, info.response)
  })
}
