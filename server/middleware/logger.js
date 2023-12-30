//this file is used to log requests coming to the server
//defining neccessary libraries
const express = require('express')
const { format } = require('date-fns')  
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

//log helper function
const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\t HH:mm:ss')}` // new date time template
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    //checking log folder exists or not creates it and adding log file
    try{
        if (!fs.existsSync(path.join(__dirname,'..','logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logFileName), logItem)
    }
    catch(e){
        console.log(e)
    }
}

const logger = (req,res,next) =>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}\t`, 'reqLog.log')
    next()
}

module.exports = { logEvents, logger}