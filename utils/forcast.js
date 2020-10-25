const request = require('request')

const forcast = (city, callback) =>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(city)+'&appid=f9cdd4f8cb899d46e168fa1192c8d1f1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather servecies', undefined)
        }
        else if(body.message !== undefined){
            callback(body.message, undefined)
        }
        else{
            callback(undefined, body.weather[0].description + ". It is currently "+ (body.main.temp-273.15).toFixed(2)+" degrees out. The wind speed is "+ body.wind.speed +" m/s.")
        }
    })
}


module.exports = forcast