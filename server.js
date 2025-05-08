const express = require('express')
const mongosse = require ('mongoose')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const path = require('path');



const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Blog'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

let name = 'Devin'

app.get('/',async (req, res) => {
    const blogPosts = await db.collection('test').find().toArray()
    
    res.render('index.ejs', {blogTitle: blogPosts, num: Math.floor(Math.random() * blogPosts.length)})
    
})

app.get('/home', (req, res) => {
    res.render('home.ejs')
})

app.get('/addPost', (req,res) => {
    res.render('addPost.ejs')
})

app.post('/addItem', (req, res) => {
    
    db.collection('test').insertOne({title: req.body.title, desc: req.body.desc, username: req.body.username })
    res.redirect('/addPost')
})

app.listen(process.env.PORT, () => {
    console.log(`This server is running on port ${process.env.PORT} go catch it`)

})