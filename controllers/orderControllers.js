const User = require ("../models/User")
const Cart = require("../models/Cart")
const Order = require("../models/Order")
const config = require("config")
const stripe = require("stripe")(config.get("StripeAPIKey"))

module.exports.get_orders = async (req, res) => {
    const userId = req.params.id
    Order.findOne({userId}).sort({date: -1})
    .then(orders => res.json(orders))
}

module.exports.checkout = async (req, res) => {

    try {
        const userId = req.params.id
        const {source} = req.body 
        let cart = await Cart.findOne({userId})
        let user = await User.findOne({_id: userId})
        const email = user.email

        if(cart){
            const charge = await stripe.charges.create({
                amount: cart.bill,
                currency: "usd",
                source: source,
                receipt_email: email
            })
            if (!charge) throw Error("Payment Failed")
            if(charge) {
                const order = await Order.create({
                    userId,
                    items: cart.items,
                    bill: cart.bill,
                });
                const data = await Cart.findByIdAndDelete({_id:cart.id})
                return res.status(201).send(order)
            }
        }else {
            res.status(500).send("Your cart is empty. Please add items")
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send("something went wrong")
    }

}