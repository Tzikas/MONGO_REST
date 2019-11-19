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
    //dbo = db.db("ironrest");
    dbo = db.db("MONGO_REST");
    
});




// Get all the characters info from http://localhost:8000/characters
// Get a single character info from http://localhost:8000/characters/:id
// Create a single character posting the data to http://localhost:8000/characters
// Delete a single character through his id in http://localhost:8000/characters/:id
// Edit a single character through his id in http://localhost:8000/characters/:id



app.get('/findOne/:collection', function(req, res, next) {


    var ObjectId = require('mongodb').ObjectID;

    var o_id = new ObjectId("5dd3bcc094f9f9c1832116be");

    var query = {};
    console.log(req.query);
    if(req.query){
        query = req.query;
    }
    console.log('q',query)

    dbo.collection(req.params.collection).findOne({_id:o_id}, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result)
        //db.close();
    });
})


// app.get('/findOne/:collection', function(req, res, next) {

//     var query = {};
//     console.log(req.query);
//     if(req.query){
//         query = req.query;
//     }
//     console.log('q',query)

//     dbo.collection(req.params.collection).findOne(query, function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.json(result)
//         //db.close();
//     });
// })


app.post('/:collection', function(req, res, next){

    console.log(req.body, '=-=-=-=-')
    dbo.collection(req.params.collection).insertOne(req.body, function(err, response) {
        if (err) throw err;
        console.log("1 document inserted");
        res.json(response)    
    })
})


// app.put('/updateOne/:collection', function(req, res, next) {

//     var myquery = { address: "Valley 345" };
//     var query =  req.query.query;
//     var newvalues = { $set: req.query.newValues };


//     dbo.collection(req.params.collection).updateOne(query, newValues, function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.json(result)
//         //db.close();
//     });
// })



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








app.get('/createCollection/:collection', function(req, res, next) {
    dbo.createCollection(req.params.collection, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        //db.close();
    });
    res.json({cool:true})
})

app.delete('/deleteCollection/:collection', function(req, res, next){
  dbo.collection(req.params.collection).drop(function(err, delOK) {
      if (err) {
          res.json(err)
      } else {
          res.json(delOK)   
      }
   })
})





app.get('/:collection', function(req, res, next){
    dbo.collection(req.params.collection).find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result)
    })
})

app.get('/', function(req, res, next) {
    dbo.listCollections().toArray(function(err, collections) {
        res.json({collections:collections})
    });
})


app.listen((process.env.PORT || 3000), function(){
    console.log("server running")
})
