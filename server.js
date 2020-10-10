const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const { options } = require('marked');
const app = express();

// Mongo DB Connection
const mongoURL = 'mongodb://localhost/blog'
mongoose.connect(mongoURL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
})

var publicDir = require('path').join('../articles/style', '/img');
app.use(express.static(publicDir));

app.use(express.static("public", options));

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles});
})

app.use('/articles', articleRouter)

app.listen(5000)
