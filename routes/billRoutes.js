const billRouter = require('express').Router()
const { stripeSecretKey } = require('../config/keys')
const stripe = require('stripe')(stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin')

// We need to explicitly wire up body parser, 
// now depricated, use express.json() instead

billRouter.post("/api/stripe", requireLogin, async (req, res) => {
    // console.log(req.body)

    const charge = await stripe.charges.create({
        amount: 100,
        currency: 'usd',
        source: req.body.id, // token that we got back from user
        shipping: {
            name: req.body.email,
            address: { //// ERR: As per Indian regulations, export transactions require a customer name and address 
                line1: "line1",
                city: "city",
                country: "US",
                line2: "line2",
                postal_code: "postal_code",
                state: "state",
            },
        },
        description: '$1 for 5 tokens',
    });
    console.log(charge)
    req.user.credits += 5
    const user = await req.user.save()
    res.send(user)

})

module.exports = billRouter
