const express = require('express');
const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name} ::> ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\t`, 'errLog.log')

    console.log(err.stack)

     //setting error status
    const status = res.statusCode ? res.statusCode : 500
    res.status(status)

    res.json({ message: err.message })

    //next()
}

module.exports = errorHandler