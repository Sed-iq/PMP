let checkbtn = document.querySelectorAll('.btns'),
    price = document.querySelectorAll('.p')[2].innerText.replace('$', '') * 100
let stripeHandler = StripeCheckout.configure({
    key: p_key,
    locale: 'en',
    token: (data) => {

    }
})
checkbtn.forEach(btn => {
    btn.addEventListener('click', event => {
        stripeHandler.open({
            amount: price
        })
    })
})