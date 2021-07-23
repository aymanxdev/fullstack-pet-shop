const mongoose = require('mognoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({

    userId:{
        type: String
    },
    items: [{
        productId: {
            type: String,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: Number,
            min: [1, "Quantity must be more than 1 "],
        },
        price: Number,
    }],
    date_added:{
        type: Date,
        default: Date.now
    }

})

module.exports = Order = mongoose.model('order', OrderSchema)