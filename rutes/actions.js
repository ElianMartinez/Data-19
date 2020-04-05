var express = require('express')
var router = express.Router()
const dataServe = require('../controllers/dataServe');

router.get("/graphic",async function(req,res) {
  let result = await dataServe.mainGraphic()
  res.send("result")
})


module.exports = router
