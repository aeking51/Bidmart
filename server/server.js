//defining neccessary libraries and other stuffs
require('dotenv').config()//this line of code allows to use environment variables globally for server side files
const express = require('express')
const path = require('path')//for path configuration
const morgan = require('morgan')
const cors = require('cors') //for cross site requests
const corsOptions = require('./configrations/corsOptions')
const cookieParser = require('cookie-parser')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const dbConnect = require('./configrations/dbConnect')

//starting express server
const server = express()
server.use(cors(corsOptions)) // for cors management
server.use(express.json()) //to receive and parse JSON
server.use(cookieParser())//to parse cookies
server.use(logger)// to start logging
dbConnect()// to connect mongo database


//configuring port number
const PORT = process.env.PORT || 3500


//HTTP logging in terminal
server.use(morgan('tiny'));


// giving the path to static files like images, css files for server
server.use('/', express.static(path.join(__dirname, 'public')));


//root routes
server.use('/', require('./routes/root'));


// the unspecified routes go through this default route. make sure this block of code stays at bottom otherwise specified routes will be ignored.
server.all('*', function (req, res) {
    res.status(200);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    } else if (req.accepts('json')){
        res.json({ message : '404 Not Found' });
    } else {
        res.type('txt').send({ message : '404 Not Found' });
    }
})


// to start error logging and handling
server.use(errorHandler)

//starting server
server.listen(PORT, () => { 
    console.log(`Server is listening on port ${PORT}`)
    console.log(`Server URL -  http://localhost:${PORT}`)
});