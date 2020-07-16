var MongoClient = require('mongodb').MongoClient;
var url = process.env.mongoURL || "mongodb://localhost:27017/";
var express = require('express');
var cors = require('cors') 
var bodyParser = require('body-parser')
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var dbo; 



MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("ironrest");
    //dbo = db.db("MONGO_REST");
    
});



/**COLLECTIONS */

app.post('/createCollection/:collection', function(req, res, next) {
    dbo.createCollection(req.params.collection, function(err, result) {
        if (err) throw err;
        console.log("Collection created!");
        //db.close();
        res.json({collectionCreated:req.params.collection})
    });
})

/**YIKES **/
app.delete('/deleteCollection/:collection', function(req, res, next){
  dbo.collection(req.params.collection).drop(function(err, delOK) {
      if (err) {
          res.json(err)
      } else {
          res.json(delOK)   
      }
   })
})




/**MORE FEATURES */
app.get('/findOne/:collection', function(req, res, next) {
    var query = {};
    if(req.query){
        query = req.query;
    }
    dbo.collection(req.params.collection).findOne(query, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result)
    });
})


app.get('/findAll/:collection', function(req, res, next) {
    var query = {};
    if(req.query){
        query = req.query;
    }
    dbo.collection(req.params.collection).find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result)
    });
})


app.delete('/deleteOne/:collection', function(req, res, next){

    var query = {};
    if(req.query){
        query = req.query;
    }
    dbo.collection(req.params.collection).deleteOne(query, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.json(obj)
    });
})




/**THE ORIGINALS */


app.put('/:collection/:id', function(req, res, next){
    console.log('in put', req.params,req.body)
    if(Object.keys(req.body).length === 0 && req.body.constructor === Object){
        return res.json({error:'object cannot be empty'})
    }
    var ObjectId = require('mongodb').ObjectID;
    var o_id = new ObjectId(req.params.id);
    var newValues = { $set: req.body };
    dbo.collection(req.params.collection).updateOne({_id:o_id}, newValues, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result)
    });
})

app.delete('/:collection/:id', function(req, res, next){
    var ObjectId = require('mongodb').ObjectID;
    var o_id = new ObjectId(req.params.id);

    dbo.collection(req.params.collection).deleteOne({_id:o_id}, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.json(obj)
    });})

app.get('/:collection/:id', function(req, res, next){
    var ObjectId = require('mongodb').ObjectID;
    var o_id = new ObjectId(req.params.id);

    dbo.collection(req.params.collection).findOne({_id:o_id},  function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result)
        //db.close();
    })
})

app.post('/:collection', function(req, res, next){

    dbo.collection(req.params.collection).insertOne(req.body, function(err, response) {
        if (err) throw err;
        console.log("1 document inserted");
        res.json(response)    
    })
})

app.get('/:collection', function(req, res, next){
    dbo.collection(req.params.collection).find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result)
    })
})

app.get('/', function(req, res, next) {
    dbo.listCollections({}, {nameOnly: true }).toArray(function(err, collections) {
        collections.unshift({DOCS: `https://github.com/Tzikas/MONGO_REST`})
        res.json(collections)
    });
})








app.listen((process.env.PORT || 3000), function(){
    console.log("server running")
})
