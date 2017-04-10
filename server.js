//var mongodb = require('mongodb').MongoClient
var express = require('express')
var mongoose = require('mongoose')
var schema = mongoose.schema
var app = express()
var validURL = require('valid-url')
var url = process.env.MONGOLAB_URI

app.get('/', (req, res)=>{
    res.send('Homepage')
})

app.get('/:shortUrl', (req, res)=>{
    var data = req.params.shortUrl
    if(!isNaN(data)){
        res.send(data)        
    }else{
      res.send("invalid data")   
    }
})

app.get('/new/*', (req, res)=>{
    var url = req.param(0)
    if(validURL.isWebUri(url)){
        var randomUrl = Math.floor((Math.random()*9999)+1)
        var newUrl = req.headers['x-forwarded-proto']+"://"+req.headers['host']+"/"+randomUrl
        res.json({originalUrl: url, shortUrl: newUrl })
    }else{
        res.json({error: "invalid url"})
    }
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log("listening on port: " + process.env.PORT || "8080")
})