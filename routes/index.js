var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var user = db.get('user');
  user.find({},{},function ( error, userlist ){
      res.render('index', {
          "userlist" : userlist
      });
  });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.render('newuser', { error: ''}); 
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    var db = req.db,
        _  = req._;

    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var collection = db.get('user');

    if (_.isEmpty(userName) || _.isEmpty(userEmail)){
      res.render('newuser', { error: 'The name or email should not be empty.' }); 
    }else {

      collection.insert({
          "username" : userName,
          "email" : userEmail
      }, function (err, doc) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          }
          else {
              res.location("/");
              res.redirect("/");
          }
      });

    }
   
});

module.exports = router;
