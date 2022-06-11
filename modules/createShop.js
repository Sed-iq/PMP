const express = require('express'),
    shopSchema = require('./shops'),
    userSchema = require('./userSchema'),
    Item = require('./item'),
    shops = require('./shops'),
    auth = require('./auth')
Router = express.Router()
var Ref; // Holds reference of the shop that called to create and item
Router.post('/createShop', async (req, res) => {
    // creates a random set of numbers (shop refrence)
    const randGen = () => {
        let shopRe = Math.floor(Math.random() * 100000000005); return shopRe
    }
    function createShop(ref, schema, req, res) {
        // create shop
        let Shop = new schema({
            referenceId: ref,
            name: req.name,
            category: req.category,
            picture: req.picture,
            location: req.location,
            email: req.email
        })

        Shop.save().then(data => {
            res.redirect(`/shop/${data._id}`)
        })
            .catch(err => {
                console.log(err)
                res.redirect('register')
            })
    }
    let shopRef = randGen()
    userSchema.findOne({ Firstname: 'Ikki' }) // Replace Firstname with req.user.id
        .then(data => {
            if (data !== null) {
                if (req.body == null) {
                    console.log('no data was sent to the server, redirecting ...')
                    res.redirect('/register')
                }
                else {
                    data.shops.unshift(shopRef)
                    if (shopRef.toString().length < 11) {
                        shopRef = randGen()
                        userSchema.findOneAndUpdate({ Firstname: "Ikki" }, { shops: data.shops })
                            .then(result => {
                                createShop(data.shops[0], shopSchema, req.body, res)
                            })
                    }
                    else {
                        userSchema.findOneAndUpdate({ Firstname: "Ikki" }, { shops: data.shops })
                            .then(result => {
                                createShop(data.shops[0], shopSchema, req.body, res)
                            })
                    }
                }
            }
            else {
                res.redirect('/register')
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect('/register')
        })

})
Router.get('/shop/:id', (req, res) => {
    shops.findById(req.params.id)
        .then(data => {
            if (data == null) res.redirect('/profile')
            else {
                res.json(data)
                Ref = data.referenceId
                console.log(Ref)
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect('/profile')
        })
})

// Create item here cause of ref export error
Router.post('/itemCreate', (req, res, next) => {
    if (Ref == null) res.redirect('/profile');
    else next()
}, (req, res) => {
    let item_ref = Math.floor(Math.random() * 4444)
    shopSchema.findOne({ referenceId: Ref })
        .then(data => {
            if (data == null) res.redirect('/profile')
            else {
                data.item_ref.unshift(item_ref)
                shopSchema.findOneAndUpdate({ referenceId: Ref }, { item_ref: data.item_ref })
                    .then(result => {
                        let item = {
                            shop_id: data.item_ref[0],
                            name: req.body.name,
                            number: req.body.number,
                            delivery_duration: req.body.duration
                        }
                        auth.saver(Item, item, res.redirect(`/item/${result._id}`))
                    })
                    .catch(err => {
                        res.redirect(`/profile`)
                        console.log(err)
                    })
            }
        })
    // shopsSchema.findOneAndUpdate({ referenceId: Ref }, { item_ref: item_ref })
})
Router.get('/sand', (req, res) => {
    setTimeout(() => {
        console.log('6 seconds')
    }, 6000)
    res.end()
})
Router.get('/san', (req, res) => {
    res.send('tester')
})
module.exports.router = Router