import Database from 'better-sqlite3'
const db = new Database('db/data.sqlite', {})
import express from 'express'
const app = express()
import fetch from 'node-fetch'


const stmt = db.prepare("SELECT stop_id FROM stations WHERE stop_name = ?")

app.get("/getID", (req, res) => {
  res.send(stmt.get(req.query.name).stop_id)
})


function apiRequest(stop) {
  const url = "https://api.transport.nsw.gov.au/v1/tp/departure_mon?"
  const params = new URLSearchParams({
    outputFormat: "rapidJSON",
    coordOutputFormat: "EPSG:4326",
    mode: "direct",
    type_dm: "stop",
    name_dm: stop,
    departureMonitorMacro: "true",
    excludedMeans: "checkbox",
    exclMOT_4: "1",
    exclMOT_5: "1",
    exclMOT_7: "1",
    exclMOT_9: "1",
    exclMOT_11: "1",
    TfNSWDM: "true",
    version: "10.2.1.42"
  })
  return url + params.toString()
}

app.get("/departures", async (req, res) => {
  const url = apiRequest(req.query.station)
  const response = await fetch(url, {
    headers: { Authorization: "apikey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ6TTZLRHRaRVBMbXI5TXFqUjFnRGNhdFc3aWQxWHJYYlJtLURDWHNhdHRJIiwiaWF0IjoxNzM0MTYzNTEzfQ.wRVXY04ILbQhj46CAtp1zKYhWudQEE7_vvx_VF0ia-U" }
  })
  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Status Code ${response.status}: ${details}`)
  }
  const departures = await response.json()
  res.json(departures)
})


app.listen(8081, () => {
  console.log("Backend active on port 8081")
})
