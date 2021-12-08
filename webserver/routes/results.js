var express = require("express");
var router = express.Router();
const db = require('../database');

/* GET home page. */
router.get("/:username", function (req, res, next) {
  // gets result that matches the userid eg: SELECT * WHERE userid = ?
  const username = req.params.username;
  const user = db
    .prepare("SELECT id FROM userinfo WHERE user = ?")
    .get(username);
  const result = db
    .prepare("SELECT result FROM resultinfo WHERE userId = ?")
    .get(user.id);
  if (!result) {
    res.status(204).json({message: "No user result"});
  }
  res.status(200);
  res.send(result);
});

router.post("/add", function (req, res, next) {
  // if result exist for user update, else add new result
  // The following link has some info on how to do that
  // https://dba.stackexchange.com/questions/89696/how-to-insert-or-update-using-single-query
  const body = req.body;
  const username = body.username;
  const result = body.result;
  const user = db
    .prepare("SELECT id FROM userinfo WHERE user = ?")
    .get(username);
  let stmt = db.prepare("SELECT * FROM resultinfo WHERE userId = ?").get(user.id);
  if (stmt) {
     stmt = db.prepare("UPDATE resultinfo SET result = ? WHERE userId = ?").run(result, user.id);
     res.status(200).json({ message: "Result updated!" });
  } else {
    stmt = db.prepare("INSERT INTO resultinfo (result, userId) VALUES (?, ?)").run(result, user.id);
    res.status(200).json({ message: "Result created!" });
  }
});

module.exports = router;
