const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    //lookup function that restricts the access to our REST API. it allows only allowedOrigins array URLs and URLs that have no origins like Postman
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    Credentials: true,//it allows credential headers
    optionsSuccessStatus: 200 
}

module.exports = corsOptions