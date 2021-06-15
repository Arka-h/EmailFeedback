module.exports = (req, res, next) => {
    if (req.body.recipients && (req.body.recipients.length > req.user.credits)) return res.send(403).send({ error: `Add more credits, to send more emails` })
    next()
}