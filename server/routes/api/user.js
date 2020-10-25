const router = require('express').Router();

const User = require('../../models/User');


router.get('/id/:id', async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({_id: id});
  return res.json(user);
});


router.get('/email/:email', async (req, res) => {
  let email = req.params.email;
  let user = await User.findOne({email: email});
  return res.json(user);
});


router.get('/username/:username', async (req, res) => {
  let username = req.params.username;
  let user = await User.findOne({username: username});
  return res.json(user);
});


router.get('/all', async (req, res) => {
  let users = await User.find({});
  return res.json(users);
});


router.post('/', async (req, res) => {
  const u = req.body;
  if (!u || u === {}) {
    return res.status(400).send();
  }
  let user = await User.findOne({ username: req.body.nickname });
  if (user) {
    return res.json(user);
  }
  user = new User({
    username: req.auth0User.nickname,
    name: u.name,
    email: u.email
  });
  user = await user.save();
  return res.json(user);
});


router.put('/', async (req, res) => {
  const u = req.body;
  if (!u || u === {}) {
    return res.status(400).send();
  }
  let user = req.dbUser;
  user.name = u.name || user.name;
  user.email = u.email || user.email;
  user = await user.save();
  return res.json(user);
});


router.get('/test', function(req, res) {
  console.log('Test user route');
  return res.send('Test user route');
});



module.exports = router;