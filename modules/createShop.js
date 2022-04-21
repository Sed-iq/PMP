// You were testing login before accepting shop making protocols

const item = require('./item')
const shops = require('./shops'),
      ex = require('express'),
      Router = ex.Router(),
      User = require('./userSchema'),
      Shop = require('./shops'),
      Item = require('./item'),
      isLoggedIn = require('./auth').login

 Router.post('/save',async (req,res)=>{
     // replace with req.user
        let ref = Math.floor(Math.random()*100000000).toString()
        User.findOne({Fb_id:'468802944794686'})
        .then(data =>{
            data.shops.push(ref)
            data.shops.reverse()
               //  data inputted are for now
            //    Saving shops

                let shop = new Shop({
                    name : req.body.shop_name,
                    user_ref: data.shops[0],
                    location: req.body.shop_location,
                    phone_no: req.body.shop_no
                })
                shop.save()
                
         .then(result =>{
                User.findOneAndUpdate({Fb_id: '468802944794686'}, {shops: data.shops})
                .then(e=> {
                    // Saving items
                    let serial = Math.floor(Math.random()*10000000000)
                    let item = new Item(
                        {
                            shop_id: data.shops[0],
                            name: req.body.item_name,
                            serial_no: serial,
                            remaining: req.body.item_rem,
                            description: req.body.item_desc
                        })

                        item.save().then (result=> console.log('Done'))
                })
     })
     .catch(err=>{
         console.log(err)
         res.redirect('/profile')
     })
    })
        .catch(err=>{
            console.log(err+ 'error')
            res.redirect('/profile')
        })
})

// Route to render and accept user info
Router.get('/createShop', )

module.exports.createShop  = Router