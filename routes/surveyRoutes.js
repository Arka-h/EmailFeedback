const surveyRouter = require('express').Router()
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Survey = require('../models/Survey')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
// We need to explicitly wire up body parser, 
// now depricated, use express.json() instead
surveyRouter.get('/api/thanks', (req, res) => { res.send('Thanks for voting!') })
surveyRouter.post("/api/createSurvey", requireLogin, requireCredits, async (req, res) => {
    // check if user has enough credits
    // recipients has list of recipientEmails
    const { title, subject, body, recipients, response } = req.body // Assume response is a list of response arrays
    const r = {} //atleast
    if (response) response.map(prop => { r[prop] = 0 }) // create a doc out of list of response strings added

    let survey = await new Survey(
        {
            title,
            subject,
            body,
            recipients,
            response: r,
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
