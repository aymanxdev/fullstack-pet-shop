const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const config = require("config")

//call express app and start using it
const app = express()
app.use(express.json())

// serve client files in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
}

// connecting to MongoDB and running server on port 4000
const dbURI = config.get('dbURI')
const port = process.env.PORT || 4000
mongoose.connect('dbURI', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((result) => app.listen(port))
.catch((err) => console.log(err))


