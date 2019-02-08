var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET frontpage. */
router.get('/', function (req, res, next) {
  res.render('frontpage', { title: 'Your Bank', strapline: 'A place to Stash Your Cash' });
});

/* GET registration page */
router.get('/transaction', function (req, res, next) {
  res.render('transaction', { title: 'Account Application' });
});

/* POST registration */
router.post('/register',
  passport.authenticate('local-register', {
    successRedirect: '/users',
    successFlash: true,
    failureRedirect: '/register',
    failureFlash: true })
);

/* GET dashboard */
router.get('/dashboard', function (req, res) {
  res.render('dashboard', { title: 'Your Dashboard', user: 'currentUser' });
});

/* render datatable page. */
router.get('/table', function (req, res, next) {
  res.render('userdetail', { title: 'dataTable' });
});

/* This is the api route to get the datatable ajax data */
router.get('/history', function (req, res, next) {
  User.find()
    .sort({ createdAt: 'descending' })
    .exec(function (err, users) {
      if (err) { return next(err); }
      console.log(users);
      res.json(users);
    });
});

/* GET users listing. */
router.get('/users', function (req, res, next) {
  User.find()
    .sort({ createdAt: 'descending' })
    .exec(function (err, users) {
      if (err) { return next(err); }
      res.render('userlist', { title: 'Our Customers', users: users });
    });
});

router.get('/users/:username', function (req, res, next) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) { return next(err); }
    if (!user) { return next(404); }
    res.render('profile', { title: 'Edit your profile', user: user });
  });
});


router.post('/edit', function (req, res, next) {
  req.user.displayName = req.body.displayName;
  req.user.bio = req.body.bio;
  req.user.save(function (err) {
    if (err) {
      next(err);
      return;
    }
    req.flash('info', 'Profile updated!');
    res.redirect('/users');
  });
});

module.exports = router;
