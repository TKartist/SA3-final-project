
var User = require('../models/user');
var Moves = require('../models/moves');
var express = require('express');
var router = express.Router();
const verify = require('./verifyToken');
var mongoose = require('mongoose');

var id;

/* GET home page. */
router.get('/index', async (req, res, next) => {
  let scores = new Map();
  response = verify.check(req);
  if (response.status) {
    console.log(response.name)
    const user = await User.find({}).lean();
    user.forEach(element => {
      scores.set(element.score, element.username,)
    })
    const sortedMap = new Map([...scores].sort().reverse())

    res.render('index', { title: 'Index Page', filename: "unlocked", name: response.name, leaderboard: sortedMap });
  } else {
    res.render('index', { title: 'Index Page', filename: "locked", name: response.name, leaderboard: sortedMap });
  }
});

router.get('/', function (req, res, next) {
  res.redirect('/index');
});

router.get('/browse', verify.auth, function (req, res, next) {
  let name = req.userName;
  console.log(name);
  res.render('browse', { username: name });
})


router.get('/test',function(req, res, next) {
  id = mongoose.Types.ObjectId();
  res.render('test', {username: verify.check(req).name});
})

router.get('/createChallenge',function(req, res, next) {
  id = mongoose.Types.ObjectId();
  res.render('create_challenge', {});
})

router.post('/createChallenge', function (req, res, next) {
});

router.post('/play', async(req, res)=> {
  const { map, atk, object } = req.body;
  
try {

  const response = await Moves.create({
    map,
    atk,
    object,
    id
  })
  console.log('created moves', response);

} catch(error){
  throw error
}
res.json({status: 'ok'});

})

router.get('/play', async (req, res) => {
  try {
    const list = await Moves.find({ id }).lean(); // only json object 

    if (!list) {
      res.status(404).json("User not found")
    }
    res.json({
      status: 'ok',
      details: list
    });
    
  } catch (error) {
    res.status(500).json(error.message);
  }
})


router.post('/play', async (req, res) => {
  const { map, atk } = req.body;

  try {

    const response = await Moves.create({
      map,
      atk,
    })
    console.log('created moves', response);

  } catch (error) {
    throw error
  }
  res.json({ status: 'ok' });
})

router.get('/chat', verify.auth, function (req, res, next) {
  res.render('chat', {});

})
router.get('/learn', verify.auth, function (req, res, next) {
  res.render('learn', {});
})


router.get('/about', function (req, res, next) {
  res.render('about', {});
})

router.post('/store-score', async(req,res,next) => {
  
  
  try {
    const { player, n } = req.body;
    var result = player.slice(1);
    console.log(result)
    let filter = {username : result}
    const user = await User.findOne(filter).lean(); // only json object 
    console.log(user)
    let copy;
    if(n == 10){
      copy = user.score - n;
    } else {
      copy = user.score + n;
    }
    user.score = copy;
    await User.updateOne(filter, {score: copy}, {new: true})
    console.log(user)

  } catch(error) {
    res.status(500).json(error.message);
  }
})



router.get('/browse-puzzles', function (req, res, next) {
  res.render('browse_puzzles', {});

})
module.exports = router;
