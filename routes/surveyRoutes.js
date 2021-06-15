const surveyRouter = require('express').Router()
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Survey = require('../models/Survey')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
// We need to explicitly wire up body parser, 
// now depricated, use express.json() instead

surveyRouter.post("/api/createSurvey", requireLogin, requireCredits, async (req, res) => {
    // check if user has enough credits
    // recipients has list of recipientEmails
    const { title, subject, body, recipients, response } = req.body // Assume response is a list of response arrays
    const r = {}
    if (response) response.map(prop => { r[prop] = 0 }) // create a doc out of list of response strings added

    const survey = new Survey(
        {
            title,
            subject,
            body,
            recipients,
            response: r,
            _user: req.user,
            dateSent: Date.now(),
        })
    // await survey.save()

    // const status = await Survey.find()
    console.log("survey",survey)
    // Mailer

    const mailer = new Mailer(survey, surveyTemplate(survey))
    mailer.send()
})

module.exports = surveyRouter
