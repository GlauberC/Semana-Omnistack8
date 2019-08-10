const express = require('express')
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DeslikeController = require('./controllers/DeslikeController')
const routes = express.Router()



routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/deslikes', DeslikeController.store)

module.exports = routes







// routes.get('/', (req, res) => {
//     return res.json({message: `Olá ${req.query.name}`})
// })