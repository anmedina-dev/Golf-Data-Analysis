const express = require('express')
const router = express.Router()
const Golf = require('../../models/Golf')

router.get('/test', function (req, res) {res.json({msg: 'backend works'})})

// @route GET /api/golf

// @desc Get golfs (public)
router.get('/', function(req, res) {
  Golf.find({Year: {$gte: 2021}, "Title": "Corales Puntacana Resort & Club Championship"})
    .then(info => res.status(200).json(info))
    .catch(err => res.status(404).json({msg: 'no scores found'}))
})

//Get all player's performances in database
router.get('/stat/:name', function(req, res) {
  let person = decodeURI(req.params.name)
  Golf.find({"Name": person})
    .then(info => res.status(200).json(info))
    .catch(err => res.status(404).json({msg: 'no person found'}))
})

//Get data of each player in specific tournament
router.get('/everytourney/:year/:tournament', function(req, res) {
    let tourny = decodeURI(req.params.tournament)
    let yearly = parseInt(req.params.year)
    Golf.find({Year: yearly, "Title": tourny})
      .then(info => res.status(200).json(info))
      .catch(err => res.status(404).json({msg: 'no scores found'}))
})

//Get years
router.get('/getyears', function(req, res) {
  Golf.find().distinct("Year")
    .then(info => res.status(200).json(info))
    .catch(err => res.status(404).json({msg: 'no years found'}))
})

//Get tournaments in a year
router.get('/specificyear/:year', function(req, res) {
  let yearly = parseInt(req.params.year)
  Golf.find({Year: yearly}).distinct("Title")
    .then(info => res.status(200).json(info))
    .catch(err => res.status(404).json({msg: 'no years found'}))
})

//Get player names in a specific tournament
router.get('/player/:year/:tournament', function(req, res) {
  let tourny = decodeURI(req.params.tournament)
  let yearly = parseInt(req.params.year)
  Golf.find({Year: yearly, "Title": tourny}).distinct("Name")
    .then(info => res.status(200).json(info))
    .catch(err => res.status(404).json({msg: 'no scores found'}))
})

//Get years a player has played
router.get('/distinctyearsplayed/:player', function(req, res) {
  let playerly = decodeURI(req.params.player)
  Golf.find({"Name":playerly}).distinct("Year")
  .then(info => res.status(200).json(info))
  .catch(err => res.status(404).json({msg: 'no years found'}))
})

//Get a player's Rank This Weeks in a specific year
router.get('/ranktw/:year/:player', function(req, res) {
  let yearly = parseInt(req.params.year)
  let playerly = decodeURI(req.params.player)
  Golf.find({Year:yearly, "Name":playerly}).distinct("Rank This Week")
  .then(info => res.status(200).json(info))
  .catch(err => res.status(404).json({msg: 'no ranktws found'}))
})


module.exports = router