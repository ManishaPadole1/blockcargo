var express = require('express');
var router = express.Router();


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var schema = mongoose.Schema;
var authschema = new schema({
  user_name:String,
  u_pass:String
});

var cargoschema = new schema({
  user_type: String,
    first_name : String,
    user_name : String,
    user_email : String,
    user_pass :String,
    user_rep_pass :String,
    client_name : String,
    mobile_no : Number,
    occupation :String,
    p_area : String,
    p_plot_no :String,
    p_app_name : String,
    p_landmark : String,
    p_city : String,
    p_state : String,
    p_contact_no : Number,
    p_email : String,
    c_area :  String,
    c_plot_no : String,
    c_app_name : String,
    c_landmark : String,
   c_city : String,
    c_state  :  String,
     c_contact_no :  Number,
     c_email : String,
     factory_name : String,
    factory_owner :String,
    factory_prod : String,
    f_city : String,
    f_phone : Number,
    f_email :String
});


mongoose.connect("mongodb://appzmine:appz12345@ds159187.mlab.com:59187/cargo_management",{ useNewUrlParser: true },
(err)=>{
  if(err){ console.log("error"+err);}
  else{console.log("connected to mlab");}
 });

 router.post('/', function(req, res){
            var cargo = req.body;
            var objlegth = Object.keys(cargo).length;

            if(objlegth>2){            
            console.log("CargoSchema matched : "+ cargo.user_name);
            var cargo_data = mongoose.model("cargo_mangs", cargoschema);
            var data = new cargo_data(cargo);
            data.save(function(err){
              if(err){
                   console.log(err);
                   return;
              }
              else{
                console.log("Inserted");
                return true;
                // res.redirect("/#/login");
              }
            } );
          }

          if(objlegth==2){
            console.log("Authentication : " + cargo.user_name + " " + cargo.u_pass);

            var authdata = mongoose.model('cargo_mangs', cargoschema);
            authdata.findOne({$and:[{user_name : cargo.user_name}, {user_pass : cargo.u_pass }]}, 
              (err, dt) =>{
              if(err){
                throw err;
              }
              else if(dt==null){
                console.log(JSON.stringify(dt));
                res.json(null);
              }
              else if(JSON.stringify(dt).length > 0){
                console.log("You are authenticated..." + dt );
                res.json(dt);
              }
              });

            // authdata.findOne({$and:[{"user_name":cargo.user_name}, {"user_pass":cargo.u_pass}]}, (err, dt)=>{
            //   if(err){
            //     throw err;
            //   }
            //   else{
            //     console.log("Authenticated..." + dt);
            //     res.json(dt);
            //   }
            // });


          }

            // cargo_data.find((err,dt)=>{
            //   if(err) throw err;
            //   else{
            //     res.json(dt);
            //     console.log(dt);
            //   }
            //   });

          });


 router.get('/:myclassobj', function(req, res){
  var search_key = req.params.myclassobj;
  console.log(search_key.user_name);
            //  res.send('GET route on things.');
            var cargo_data = mongoose.model("cargo_mangs", cargoschema);
            cargo_data.find((err,dt)=>{
              if(err) throw err;
              else{
                res.json("data is "+ dt);
                console.log("data is " + dt);
                return true;
              }
              });
        });


module.exports = router;
