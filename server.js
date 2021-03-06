var mongodb = require('mongodb').MongoClient
var express = require('express')
var app = express()
var validURL = require('valid-url')
var bodyParser = require('body-parser')
var mongoUrl = process.env.MONGOLAB_URI 
var jsonParser = bodyParser.json()

app.get('/', (req, res)=>{
    res.sendFile('./index.html', {root: __dirname })
})

app.get('/:shortUrl', (req, res)=>{
    var data = req.params.shortUrl
    if(!isNaN(data)){
        var url = req.headers['x-forwarded-proto']+"://"+req.headers['host']+"/"+data
        mongodb.connect(mongoUrl, (err,db)=>{
            if(err){ throw err}
            db.collection('urls_col').find({short_url : url}).toArray((err, doc)=>{
                if(err){throw err}
                res.redirect(doc[0].original_url)
                db.close()
            })
        })
    }else{
      res.json({error: "invalid data"})   
    }
})

app.get('/new/*', jsonParser, (req, res)=>{
    var url = req.param(0)
    if(validURL.isWebUri(url)){
        var randomUrl = Math.floor((Math.random()*9999)+1)
        var newUrl = req.headers['x-forwarded-proto']+"://"+req.headers['host']+"/"+randomUrl
        var urlDoc = {original_url : url, short_url : newUrl} 
        
        mongodb.connect(mongoUrl, (err, db)=>{
            if(err){ throw err}
            db.collection('urls_col').insert(urlDoc)
            db.close()
        })
        res.json(urlDoc)
    }else{
        res.json({error: "invalid url"})
    }
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log("listening on port: " + process.env.PORT || "8080")
})