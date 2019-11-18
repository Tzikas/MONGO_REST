
app.get('/findOne/:collection', function(req, res, next) {

    var query = {};
    console.log(req.query);
    if(req.query){
        query = req.query;
    }
    console.log('q',query)

    dbo.collection(req.params.collection).findOne(query, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result)
        //db.close();
    });
})


app.post('/insertOne/:collection', function(req, res, next){

    dbo.collection(req.params.collection).insertOne(req.body, function(err, response) {
        if (err) throw err;
        console.log("1 document inserted");
        res.json(response)    
    })
})


app.put('/updateOne/:collection', function(req, res, next) {

    var myquery = { address: "Valley 345" };
    var query =  req.query.query;
    var newvalues = { $set: req.query.newValues };


    dbo.collection(req.params.collection).updateOne(query, newValues, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result)
        //db.close();
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
        res.json({result})
    })
})

app.get('/', function(req, res, next) {
    dbo.listCollections().toArray(function(err, collections) {
        res.json({collections:collections})
    });
})

