const Router = require('express').Router(),
    Ref = require('./createShop'),
    shopsSchema = require('./shops'),
    userSchema = require('./userSchema'),
    itemSchema = require('./item')
Router.get('/item/:id', (req, res) => {
    // This part shows users the items in their shops
    itemSchema.findById(req.params.id)
        .then(data => {
            if (data == null) res.redirect('/profile')
            else {
                res.send('items are supposed to show here')
            }
        })
})

// cookie testing

Router.post('/buy', (req, res) => {
    if (req.body.itRef == null || req.body.amt == null) res.redirect('/profile')
    else {
        res.cookie(req.body.itRef, req.body.amt, {
            httpOnly: true,
            sameSite: true,
            maxAge: 1000 * 60 * 15,
            secure: true
        })
        res.json('Done')
    }
})
Router.get('/cart', (req, res) => {
    if (req.cookies == '') res.end('Empty cart')
    else {
        res.json(req.cookies)
    }
})
Router.get('/checkout', (req, res) => {
    let orders = {
        Name: 'baby powder',
        Item_ref: '234',
        Price: '$200',
    }
    res.render('checkout', {
        orders: {
            key: Object.keys(orders),
            props: Object.values(orders)
        },
        p_key: process.env.STRIPE_PUBLIC_KEY
    })
})


module.exports = Router

// Items need to add a picture api `