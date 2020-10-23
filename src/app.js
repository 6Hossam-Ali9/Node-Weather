const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forcast = require('../utils/forcast')

const app = express()

const publicdir = path.join(__dirname, '../public')
const viewsdir = path.join(__dirname, '../templets/views')
const partialsdir = path.join(__dirname, '../templets/partials')

app.set('view engine', 'hbs')
app.set('views', viewsdir)
hbs.registerPartials(partialsdir)


app.use(express.static(publicdir))


app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hossam Ali'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        exp:'How can we help you?',
        name:'Hossam Ali'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Hossam Ali'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.city){
        return res.send({
            error: 'Please provide a city name!'
        })
    }
    forcast(req.query.city, (error, response) =>{
        if(error !== undefined){
            return res.send({error})
        }
       return res.send({
            forcast:response
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('errors', {
        title:'404',
        err: 'Help article not found',
        name:'Hossam Ali'
    })
})

app.get('/about/*', (req, res) => {
    res.render('errors', {
        title:'404',
        err: 'About article not found',
        name:'Hossam Ali'
    })
})


app.get('*', (req, res) => {
    res.render('errors', {
        title:'404',
        err: 'Page not found',
        name:'Hossam Ali'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})