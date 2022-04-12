const express = require('express')
const mongoose = require ('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const UserRoutes= require('./routes/UserRoutes')
const PostRoutes= require('./routes/PostRoutes')
const BlogRoutes= require('./routes/BlogRoutes')

const ProductRoutes= require('./routes/ProductRoutes')


mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running on ',{PORT})
})

app.use('/api', UserRoutes)
app.use('/api/post', PostRoutes)
app.use('/api/product', ProductRoutes)
app.use('/api/blog', BlogRoutes)