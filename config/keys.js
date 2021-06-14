if (process.env.NODE_ENV !== 'production') // Heroku : https://devcenter.heroku.com/articles/nodejs-support#runtime-behavior, pre-set value to 'production'
    require('dotenv').config()
// In production, we must provide below env variables

const {
    GCLIENT_ID, GCLIENT_SECRET,
    MONGO_ADMIN, MONGO_PASSWD, MONGO_PROJECT, DB_NAME,
    COOKIE_KEY,
    STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env
module.exports = {
    googleId: GCLIENT_ID,
    googleSecret: GCLIENT_SECRET,
    mongoURI: `mongodb+srv://${MONGO_ADMIN}:${MONGO_PASSWD}@cluster0.${MONGO_PROJECT}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    cookieKey: COOKIE_KEY,
    stripePublishableKey: STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: STRIPE_SECRET_KEY
}
