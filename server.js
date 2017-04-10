var mongodb = require('mongodb').MongoClient
var url = ""

mongodb.connect(url, (err, db)=>{
    if(err){
        console.error('Database error' + err)
    }else{
        console.log('Database connected')
        
        db.close()
    }
    
});