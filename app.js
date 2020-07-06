const express = require('express')
const mongoose = require('mongoose')
const config = require('./config.json')
const app = express()
const port = config.PORT || 3000

mongoose.connect(config.MONGODB , {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) throw err;

    app.listen(port);
    console.log(`app listen on port ${port}\nhttp://localhost:${port}`)
})

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/api', require('./routes/main'))

app.use((req, res) => {
    res.status(404).send('<h1>404 Page Not Found</h1>')
})