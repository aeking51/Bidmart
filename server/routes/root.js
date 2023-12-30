//defining neccessary libraries
const express = require('express')
const path = require('path') //for path configuration

// starting routes
const route = express.Router();


/**
 * @description Root Route
 * @method GET / 
 * 
 */
// regex expression says this route accepts only / and /index requests.(.html)? is says it can be written in /index or /index.html. .html is  optional
route.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'..','views', 'index.html')); //'..','views', 'index.html' represents ../views/index.html
});


module.exports = route;