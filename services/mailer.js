const { MailService } = require('@sendgrid/mail');
const keys = require('../config/keys')

class Mailer extends MailService {
    constructor({ subject, recipients }, content) { // Enter in Schema format
        super() // Client created, can now call 
        this.setApiKey(keys.sendGridKey) // Set Keys
        this.data = {
            to: recipients.map(r => r.email),
            from: 'aurkohaldi@gmail.com',
            subject,
            html: content,
            trackingSettings: {
                clickTracking: {
                    enable: true,
                    enableText: true
                }
            }
        }
    }

    async sendMail(data = {}, content = '', cb) { // optionally add any params default 
        if (typeof content === 'function')
            cb = content
        else if (typeof data === 'function')
            cb = data
        // callback handling
        if (data.subject || data.recipients || content) {
            // update whichever is not populated
            this.data.subject = data.subject ? data.subject : this.data.subject
            this.data.to = data.recipients ? data.recipients.map(r => r.email) : this.data.to
            this.data.html = data.content ? data.content : this.data.html
        }

        // check if all three are filled, else error
        if (!(this.data.subject && this.data.to.length && this.data.html)) // Always going to have them in an array
            throw new Error("Enter all the required fields: \ndata: { subject: String, recipient(s): String | Array(String) }, \ncontent : String")

        console.log("debugging", this.data)
        await this.send(this.data, true, cb)
    }
}


module.exports = Mailer