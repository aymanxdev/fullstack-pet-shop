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
        

    }
    catch (error) {

    }

}