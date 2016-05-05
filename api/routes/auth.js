'use strict';

const express = require('express');
const passport = require('passport');
let router = express.Router();

router.get('/login', (req, res) => {
  res.json({
    router: 'login',
  });
});

router.get('/loadauth', (req, res) => {
  res.json({
    data: req.session.user || null,
  });
});

router.post('/login',
      passport.authenticate('local-login'),
      (req, res) => {
  setTimeout(() => {
    res.json({
      data: req.session.user,
    });
  }, 2000);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({
    message: 'ok',
  });
});

router.get('/user', isAuthenticated, (req, res) => {
  res.status(200).json({
    data: 'send from server',
  });
});


function isAuthenticated(req, res, next) {
    if (req.session.user) {
      return next();
    }
    res.json({ error: 'Unauthorized'});
}


module.exports = router;
