const db = require('better-sqlite3')('foobar.db', {});
//const db = new sqlite3.Database('db/data.sqlite');

db.prepare("DROP TABLE lorem").run()
db.prepare("CREATE TABLE lorem (info TEXT)").run()

const stmt = db.prepare("INSERT INTO lorem VALUES (?)")
for (let i = 0; i < 10; i++) {
  stmt.run("Ipsum " + i)
}

for (const x of db.prepare("SELECT rowid AS id, info FROM lorem").all()) {
  console.log(x.id + ": " + x.info)
}


db.prepare("DROP TABLE lorem").run()
db.close();
