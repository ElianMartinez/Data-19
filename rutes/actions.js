var express = require('express')
var router = express.Router()
const dataServe = require('../controllers/dataServe');

/* Data for print the main graphic */
router.get("/graphic",async function(req,res) {
  let result = await dataServe.mainGraphic()
  console.log(result);
  res.json({
    data:result
  })
})

/* Basic data send */
router.get("/death",async function(req,res) {
  let result = await dataServe.serveData("Death")
  res.json({
    data:result
  })
})

router.get("/infected",async function(req,res) {
  let result = await dataServe.serveData("Infected")
  res.json({
    data:result
  })
})

router.get("/recover",async function(req,res) {
  let result = await dataServe.serveData("Recover")
  res.json({
    data:result
  })
})


/* Data predictions and porcents */
router.get("/prediction",async function(req,res) {
  let result = await dataServe.predictInfection()
  console.log(result);
  res.json({
    data:result
  })
})


router.get("/deathrate",async function(req,res) {
  let result = await dataServe.deathRate()
  res.json({
    data:result
  })
})

router.get("/infected/porcent",async function(req,res) {
  let result = await dataServe.deathRate()
  res.json({
    data:result
  })
})

router.get("/map",async function(req,res) {
  let result = await dataServe.loadMap()
  res.json({
    data:result
  })
})



module.exports = router
