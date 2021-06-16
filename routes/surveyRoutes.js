const surveyRouter = require('express').Router()
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Survey = require('../models/Survey')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
// We need to explicitly wire up body parser, 
// now depricated, use express.json() instead
surveyRouter.get('/api/:surveyId/:choice', (req, res) => { res.send('Thanks for voting!') })
surveyRouter.post('/api/webhooks', (req, res) => {
    // [
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'processed',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'oqVF8kaK-qbGUXlX1tqsjg==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0'
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'deferred',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'HA6bMeRYbFyxiIegu9X7KA==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
    //     [0]     response: '400 try again later',
    //     [0]     attempt: '5'
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'delivered',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'fvQPzHI_t7ILqlMcTDgloQ==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
    //     [0]     response: '250 OK'
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'open',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'rSIh-ejB83mkQgmxdM_yAg==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
    //     [0]     useragent: 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
    //     [0]     ip: '255.255.255.255'
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'click',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'IO-VJs8XqKU4lWp5jo1fSw==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
    //     [0]     useragent: 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
    //     [0]     ip: '255.255.255.255',
    //     [0]     url: 'http://www.sendgrid.com/'
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'bounce',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'VY_X2cPeISBrnSr6mn0kww==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
    //     [0]     reason: '500 unknown recipient',
    //     [0]     status: '5.0.0'
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'dropped',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'Jo0mbWPmv3ytIVrjO4LtBA==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
    //     [0]     reason: 'Bounced Address',
    //     [0]     status: '5.0.0'
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'spamreport',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'yTKZ1dvcwAWwATKR2QX6GA==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0'
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'unsubscribe',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: '8hnSmP0p4Vf-Cofu2L2q-A==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0'
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'group_unsubscribe',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'YCzg_1g_tYk2nurnsHVftA==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
    //     [0]     useragent: 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
    //     [0]     ip: '255.255.255.255',
    //     [0]     url: 'http://www.sendgrid.com/',
    //     [0]     asm_group_id: 10
    //     [0]   },
    //     [0]   {
    //     [0]     email: 'example@test.com',
    //     [0]     timestamp: 1623847301,
    //     [0]     'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //     [0]     event: 'group_resubscribe',
    //     [0]     category: [ 'cat facts' ],
    //     [0]     sg_event_id: 'sjAGD-sH5G8OLHLryPj18g==',
    //     [0]     sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
    //     [0]     useragent: 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
    //     [0]     ip: '255.255.255.255',
    //     [0]     url: 'http://www.sendgrid.com/',
    //     [0]     asm_group_id: 10
    //     [0]   }
    //     [0] ]

    // npx ngrok http 5000 > exposes a port in the web to listen to WebHooks

    console.log(req.body)
    res.status(200).send({})
})
surveyRouter.post("/api/createSurvey", requireLogin, requireCredits, async (req, res) => {
    // check if user has enough credits
    // recipients has list of recipientEmails
    const { title, subject, body, recipients, response } = req.body // Assume response is a list of response arrays
    const resp = {} //atleast
    if (response) response.map(prop => { resp[prop] = 0 }) // create a doc out of list of response strings added
    const recip = recipients.map(p => ({ email: p }))

    let survey = await new Survey(
        {
            title,
            subject,
            body,
            recipients: recip, // Frontend should be like schema, responded is not necessary
            response: resp,
            _user: req.user,
            dateSent: Date.now(),
        })

    const mailer = new Mailer(survey, surveyTemplate(survey))
    // Mailer
    try {
        await survey.save()
        await mailer.sendMail()
        req.user.credits -= 1
        const user = await req.user.save()
        res.send(user)
    }
    catch (err) {
        res.status(422).send(new Error(err))
    }
})

module.exports = surveyRouter
