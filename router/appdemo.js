var express= require('express');
var router = express.Router();
var mongoose = require("mongoose");
/** Working code for Mongoose Db for mlab but not working for localhost */

var schema = mongoose.Schema;
var mycolschema =  new schema({ 
  fname : {type: String},
  lname : {type: String}
});
// mongoose.connect("mongodb://localhost:27017/StudentDatabase",
  mongoose.connect("mongodb://ManishaP:COOL_1mani@ds151393.mlab.com:51393/studentdb",
  { useNewUrlParser : true }, 
  (err)=>{
     if(err) {
       throw err;
     }
     else {  
       console.log("Connected to mlab");  
     }
    }
  );

router.get('/', function(req, res, next){
   var dbdata = mongoose.model('employees', mycolschema);
      dbdata.find((err, data)=>{
     if(err){
       console.log("Error " + err);
     }
     else{
       res.json(data);
       console.log(data);
      //  res.send("Api works :=> " + data.fname);
      //  console.log("Data from db = " + JSON.stringify(data));
     }
    });
});

router.post('/', function(req, res, next){
  console.log("Post called "+ req.body + " " +req.body.fname + req.body.lname);
  var todo = req.body;
  var dbdata = mongoose.model('employees', mycolschema);
  var data = new dbdata(todo);
  data.save((err)=>{
    if(err) throw err;
  });

  dbdata.find((err, data)=>{
    if(err){
      console.log("Error " + err);
    }
    else{
      res.json(data);
      console.log(data);
    }
   });
  }
);
router.delete('/:id', function(req, res, next){ 
  console.log("Delete api called..." + req.params.id);
  
  var dbdata = mongoose.model('employees', mycolschema);
  dbdata.deleteOne({ _id : req.params.id}, (err)=>{
    if(err){
      throw err;
    }
    else{
      console.log("Deleted succesfully...." );
    }
  });
});

router.put('/:id', (req, res)=>{
    
  console.log("Put called ... "+ req.params.id);
});

router.get('/local', function(req, res, next){

  /* Mongo Db Working for localhost but not working for mlab */
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://ManishaP:COOL_1mani@ds151393.mlab.com:51393/studentdb";
  // var url = "mongodb://localhost:27017";
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    console.log("Entered connect");
    if (err){
      console.log("Error connecting ");
      throw err;
    }
    else{
      var dbo = db.db("studentdb");
      dbo.collection("employees").findOne({}, function(err, result) {
        if (err) {     
          console.log("Error " + err);
          throw err; 
        }
        console.log("Connected to mlab");
        console.log(result.fname);
        res.send("Local called ");
        db.close();
      }) ;
    }
  
  });
});



module.exports = router;