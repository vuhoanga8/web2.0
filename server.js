var http = require("http");
var express = require("express");
var fileHelper = require("./fileHelper");
var statistic = require("./Statistic");
var bodyParser = require('body-parser')

/******************************** DB *****************************/

var mongoose = require('mongoose');
var Clazz = require('./db/models/class');
var User = require('./db/models/user');
mongoose.connect('mongodb://localhost/techkids1');

User.find({username: "admin"})
.populate('clazz')
.exec(function(err, data){
  console.log(data);
});

// var Clazz = require('./db/models/class');
// var class1 = new Clazz({
//   teacher: {
//     age: 21
//   }
// });
//
// var error = class1.validateSync();
// console.log(error);
// var class1 = new Class(
//   {
//     name: "class1",
//     students: [],
//     teacher: {name: "giaovien"},
//     startedDate: Date.now(),
//     total: 10
//   }
// );
//
// class1.save(function(err){
//   console.log(err)
// });

// var user = new User({name: "test"});
// user.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('saved');
//   }
// });

/*********************************************************************/

var app = express();
app.use(express.static(__dirname + "/client"));
app.use( bodyParser.json() );


app.route("/api/user/login")
      .get(function(req, res){
        User.find({username: /dm/})
        .limit(1)
        .select("username password")
        .exec(function(err, data){
          console.log(data);
          res.send(data);
        });
      })
      .post(function(req, res){
        if (req.body) {
          User.find({username: req.body.username, password: req.body.password}, function(err, data){
            if (data.length > 0) {
              res.json({status: true})
            } else {
              res.json({status: false})
            }
          });
        } else {
          res.json({status: false})
        }
      });

  //    =========================== USER ===============================
app.get('/api/getUser', function(req, res){
  User.find()
  .exec(function(err, data){
    res.json(data)
  });
});
app.get('/api/getUserByName/:name', function(req, res){
  User.find({name: req.params.name}, function(err, data){
    if(data.length > 0){
      res.json(data);
    }
    else{
      res.json([]);
    }
  });
});
app.get('/api/getUserByAccount/:account', function(req, res){
  User.find({username: req.params.account}, function(err, data){
    if(data.length > 0){
      res.json(data);
    }
    else{
      res.json([]);
    }
  });
});
//
// // ============================= QA ====================
//
app.get('/api/getQA', function(req, res){
  User.find()
  .exec(function(err, data){
    res.json(data)
  })
});
app.get('/api/getQA/single', function(req, res){
  User.find({single:"true"}, function(err, data){
    if(data.length > 0){
      res.json(data);
    }
    else{
      res.json([]);
    }
  });
app.get('/api/getQA/multi', function(req, res){
  User.find({single:"false"}, function(err, data){
    if(data.length > 0){
      res.json(data);
    }
    else{
      res.json([]);
    }
  });
});
// ============================= test ====================
app.get('/api/getTest', function(req, res){
  User.find()
  .exec(function(err, data){
    res.json(data)
  });
});
app.get('/api/getTestByName/:name', function(req, res){
  User.find({title: req.params.name}, function(err, data){
    if(data.length > 0){
      res.json(data);
    }
    else{
      res.json([]);
    }
  });
});

// ============================= Result ====================
app.get('/api/getResult', function(req, res){
  User.find()
  .exec(function(err, data){
    res.json(data)
  });
});

http.createServer(app).listen(8888);
