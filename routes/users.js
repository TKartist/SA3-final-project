var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user')
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/login-app-db',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})


var router = express.Router();

var model = require ('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('log-in', {});
})

router.get('/new', function(req, res, next) {
  res.render('sign-in', {});
})

router.post('/new', async(req, res)=> {
  console.log(req.body);

  //Hashing the password == algorithm bcrypt

  const {email, username, password} = req.body;

  //check email
  if(!email || typeof email !== 'string'){
    return req.json({status: 'error', error: 'Invalid Email'})
  }
 
  //check username

  if(!username || typeof username !== 'string'){
    return req.json({status: 'error',  error: 'Invalid Username'})
  }

  //check password

  if(!password || typeof password !== 'string'){
    return req.json({status: 'error',  error: 'Invalid Password'})
  }

  console.log('password is ' + password);

  const password_crypt = await bcrypt.hash(password, 5)

  try {

    const response = await User.create({
      email,
      username,
      password_crypt
    })
    console.log('User created successfully', password_crypt);
    console.log('User created successfully', response);

  } catch(error){
    console.log(JSON.stringify(error))
    if(error.code === 11000){
      return res.json({status : 'error', error: 'Username already in use'})
    }
    throw error
  }

  res.json({status: 'ok'});
})

router.get('/browse', function(req, res, next) {
  res.render('browse', {});
})

module.exports = router;
