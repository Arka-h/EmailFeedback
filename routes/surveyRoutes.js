const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url') // node helper lib
const surveyRouter = require('express').Router()
const { ObjectId } = require('mongoose').Types
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Survey = require('../models/Survey')
const Mailer = require('../services/mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
// We need to explicitly wire up body parser, 
// now depricated, use express.json() instead
surveyRouter.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false })
    res.status(200).send(surveys)
})
surveyRouter.get('/api/:surveyId/:choice', (req, res) => { res.send('Thanks for voting!') })
surveyRouter.post('/api/webhooks', (req, res) => {
    // [
    //     ...
    //     ,
    //     {
    //       email: 'example@test.com',
    //       timestamp: 1623847301,
    //       'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
    //       event: 'group_resubscribe',
    //       category: [ 'cat facts' ],
    //       sg_event_id: 'sjAGD-sH5G8OLHLryPj18g==',
    //       sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
    //       useragent: 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
    //       ip: '255.255.255.255',
    //       url: 'http://www.sendgrid.com/',
    //       asm_group_id: 10
    //     }
    // ]

    // npx ngrok http 5000 > exposes a port in the web to listen to WebHooks

    const p = new Path('/api/:surveyId/:choice') // is null if pattern not present

    const events = _.chain(req.body)
        .map(({ email, url }) => {
            const match = p.test(new URL(url).pathname)
            return match ? ({ email, ...match }) : undefined
        })
        .compact()
        .uniqBy('email', 'surveyId')  // keeps only the unique entries, by {'email','surveyId'}
        .each(({ surveyId, email, choice }) => {
            // console.log("updating")
            Survey.updateOne({
                _id: ObjectId(surveyId),
                recipients: { $elemMatch: { email: email, responded: false } }
            }, {
                $inc: { [`response.${choice}`]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec()
        })
        .value()
    // console.log("console logging: ", events)
    res.status(200).send() // to sendgrid
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
