module.exports = (req, res, next) => {
    if (!req.user) return res.send(401).send({ error: 'You must Log In!' })
    next()
}