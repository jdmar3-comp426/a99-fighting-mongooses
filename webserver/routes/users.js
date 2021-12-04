var express = require('express');
const md5 = require('md5');
const crypto = require('crypto');
const db = require('../database');
const jwt = require('jsonwebtoken');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const stmt = db.prepare("SELECT * FROM userinfo").all();
  res.status(202).json(stmt);
});

router.post('/add', (req, res) => {
  try {
    const body = req.body;
    const username = body.username;
    const salt = crypto.randomBytes(16).toString("base64");
    let password = md5(body.password + salt);
    const stmt = db.prepare("INSERT INTO userinfo (user, pass, salt) VALUES (?, ?, ?)").run(username, password, salt);
    let token = jwt.sign({ username }, SECRET, { expiresIn: '1800s' });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({'message': `1 record created: ID ${stmt.lastInsertRowid} (201)`});
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).json({'message': `Account already exist with the given username (409)`});
    } else {
      res.sendStatus(400);
    }
  }
})

router.delete('/delete', (req, res) => {
  try {
    const body = req.body;
    const username = body.username;
    let user = db
      .prepare("SELECT id FROM userinfo WHERE user = ?")
      .get(username);
    const deleteResults = db.prepare(`DELETE FROM resultinfo WHERE userId = '${user.id}'`).run();
    const stmt = db.prepare(`DELETE FROM userinfo WHERE id = '${user.id}'`).run();
    res.status(200).json({'message': `User: ${username} deleted`});
  } catch (err) {
    console.log('Error: ' + err.message);
  }
  
})

module.exports = router;
