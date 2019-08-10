const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

mongoose.connect( "mongodb+srv://omnistack:omnistack@cluster0-le69g.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
})


server.listen(3333)






// server.get('/', (req, res) => {
//     return res.json({message: `Hello ${req.query.name}`})
// })


// server.get('/', (req, res) => {
//     return res.send(`Olá ${req.query.name}`)
//     // http://localhost:3333/?name=Glauber
// })

// server.listen(3333)