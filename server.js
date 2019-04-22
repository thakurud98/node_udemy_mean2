const express = require('express');
const hbs = require('hbs')
const app = express();
const fs = require('fs')
const port = process.env.PORT || 3002



//setting hbs for templating
app.set('view engine', 'hbs')

//setting hbs partials
hbs.registerPartials(__dirname + '/views/partials')

//helper for HbS files to use common function
hbs.registerHelper ('getCurrentYear',()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('upperCase',(text)=>{
    return text.toUpperCase();
})

//middleware
// /object are req, req and next
//to fire upcoming function after this app.use() we must call next();
//next() will tell express that this middlerawe is done
app.use((req, res, next)=>{
    let now = new Date().toString()
    let log = `${now}: ${req.method}: ${req.url}`
    console.log(log)
    fs.appendFile('server.log',log + '\n', (err)=>{
        console.log('Unable to store logs')
    })
    next();//if we don't call next() the other routes or middlewaare will never be called
})

//middleware for maintanance
// app.use((req,res, next)=>{
//     res.render('maintanance.hbs')
// })

/*
also using express as middleware
app.use registers the middleware and takes one argument
*/
app.use(express.static(__dirname + "/public")) //middleware for directory

app.get('/', (req, res)=>{
    // res.send("<h1>Express</h1>" {})
   res.render('home.hbs', {
    homePage : 'Home',
    welcomeMessage : 'Welcome to localhost:3002',
    pageTitle: 'Home',
   })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle : 'About page',
    })
})

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'unable to fetch data'
    })
})

app.get('/*',(req, res)=>{
    res.send('404! not found')
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}..`)
})



// v5-9 2.47