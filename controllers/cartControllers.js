const Cart = require("../models/Cart")
const Item = require("../models/Item")


module.exports.get_carts_items = async (req, res) => {
    const userId = req.params.id

    try{
        let cart = await Cart.findOne({userId});
        if (cart && cart.items.length > 0){
            res.send(cart)
        }else {
            res.send(null)
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).send("something went wrong")
    }
}

module.exports.add_cart_item = async (req, res) => {
    const userId = req.params.id
    const {productId, quantity} = req.body

    try {
        let cart = await Cart.findOne({userId});
        let item = await Item.findOne({_id: productId})

        //if no product found 
        if(!item) {
            res.status(404).send("Item not found")
        }

        const price = item.price
        const name = item.title

        //if cart exists
        if(cart){
            let itemIndex = cart.items.findIndex(p => p.productId == prodcutId );

            //check if product exists in the cart
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex]
                productItem.quantity += quantity
                cart.items[itemIndex] = productItem
            }else{
                cart.items.push({productId, name, quantity, price,})
            }

            cart.bill += quantity*price
            cart = await cart.save()
            return res.status(201).send(cart)
        } else {
            //if no cart then create a new one
            const newCart = await Cart.create({
                userId,
                items:[{productId, name, quantity, price}],
                bill: quantity*price
            })
            return res.status(201).send(newCart)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}

module.exports.delete_item = async (req, res) => {
    const userId = req.params.userId
    const productId = req.params.itemId
    try {
        let cart = await Cart.findOne({userId})
        let itemIndex = cart.items.findIndex(p => p.prodcutId == productId);
        if (itemIndex > -1){
            let productItem = cart.items[itemIndex]
            cart.bill -= productItem.quantity*prodcutItem.price
            cart.items.splice(itemIndex, 1)  
        }
        cart = await cart.save()
        return res.status(201).send(cart)

    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong")
    }
}