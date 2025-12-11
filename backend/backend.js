const db = require('better-sqlite3')('db/data.sqlite', {});
const express = require('express')
const app = express()


const stmt = db.prepare("SELECT stop_id FROM stations WHERE stop_name = ?")

app.get("/getID", (req, res) => {
  res.send(stmt.get(req.query.name).stop_id)
})

app.listen(8081, () => {
  console.log("Backend active on port 8081")
})
