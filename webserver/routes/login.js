var express = require('express');
const md5 = require('md5');
const crypto = require('crypto');
const db = require('../database');
const jwt = require('jsonwebtoken');
const e = require('express');

var router = express.Router();

router.post('/', (req, res) => {
  const body = req.body;
  const username = body.username;
  let user = db.prepare("SELECT * FROM userinfo WHERE user = ?").get(username);
  let password = md5(body.password + user.salt);
  if (password === user.pass) {
    let token = jwt.sign({ username }, SECRET, { expiresIn: '1800s' });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(200);
  } else {
        res.status(401).json({'message': 'Incorrect username and/or password'});
  }
})

module.exports = router;