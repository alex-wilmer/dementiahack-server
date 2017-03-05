import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
  service: `gmail`,
  auth: {
    user: `jgnieuwhof@gmail.com`,
    pass: `14C%811ajn`,
  },
})

export default mail = ({ email, subject, content }) => {
  let mailOptions = {
    from: `"Lassie" <noreply@lassie.com>`, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: `<b>Hello world ?</b>`, // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log(`Message %s sent: %s`, info.messageId, info.response)
  })
}
