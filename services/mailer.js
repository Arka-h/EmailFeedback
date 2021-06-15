const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super()
        this.sgApi = sendgrid(keys.sendGridKey)
        this.from_email = new helper.Email('aurkohaldi@gmail.com')
        this.subject = subject
        this.body = new helper.Content("text/html", content)
        this.recipients = recipients.map(r => new helper.Email(r.email))

        this.addContent(this.body)
        this.addClickTracking()
        this.addRecipients()
    }

    addRecipients(){
        const personalize = new helper.Personalization()
        this.recipients.forEach( recipient => personalize.addTo(recipient))
        this.addPersonalization(personalize)
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings()
        const clickTracking = new helper.ClickTracking(true, true)

        trackingSettings.setClickTracking(clickTracking)
        this.addTrackingSettings(trackingSettings)
    }

    async send(){
        const request =this.sgApi.emptyRequest({
            method:'POST',
            patch:'v3/mail/send',
            body: this.toJSON()
        })
        const response = this.sgApi.API(request)
        return response

    }

}

module.exports = Mailer