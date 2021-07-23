const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')

module.exports.signup = (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400).json({msg: "Please fill in all the required fields"})
    }

    User.findOne({email})
    .then(user => 
        {if (user) return res.status(400).json({msg: "This email already exists "});

        const newUser = new User({name, email, password});

        //Salt and hash passwords 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    jwt.sign(
                        {id: user._id},
                        config.get('jwtsecret'),
                        {expiresIn: 3600},
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token, 
                                user:{
                                    id:user._id,
                                    name: user.name,
                                    email: user.email,
                                }
                            });
                        }
                    )
                });
            })
        })
    })
        

}

module.exports.login = async (req, res) => {

    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400).json({msg:"Please fill in all the fields"})
    }

    User.findOne({email})
    .then(user => {if (!user) res.status(400).json({msg: "User entered does not exist"});

    //hash and validate the hashed password
    bcrypt.compare(password, user.password)
    .then(isMatch => {if (!isMatch) res.status(400).json({msg: "Invalid Password"})

    jwt.sign(
        {id: user._id},
        config.get('jwtsecret'),
        {expiresIn: 3600},
        (err, token) => {
            if(err) throw err;
            res.json({
                token, 
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
        }
    )

})


})


}

module.exports.get_user = (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
}