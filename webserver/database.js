// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('user.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        DROP TABLE IF EXISTS userinfo;
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, user TEXT UNIQUE, pass TEXT, salt TEXT);
		INSERT INTO userinfo (user, pass) VALUES ('admin','bdc87b9c894da5168059e00ebffb9077');
        DROP TABLE IF EXISTS resultinfo;
        CREATE TABLE resultinfo (resultId INTEGER PRIMARY KEY, result TEXT, userId INTEGER references userinfo(id));
        INSERT INTO resultinfo (userId, result) VALUES (1, 'Gryffindor Lion');
    `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db
