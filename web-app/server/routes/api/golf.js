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

router.get('/:year/:tournament', function(req, res) {
    let tourny = decodeURI(req.params.tournament)
    let yearly = parseInt(req.params.year)
    Golf.find({Year: yearly, "Title": tourny})
      .then(info => res.status(200).json(info))
      .catch(err => res.status(404).json({msg: 'no scores found'}))
  })

router.get('/getyears', function(req, res) {
  Golf.find().distinct("Year")
    .then(info => res.status(200).json(info))
    .catch(err => res.status(404).json({msg: 'no years found'}))
})

router.get('/:year', function(req, res) {
  let yearly = parseInt(req.params.year)
  Golf.find({Year: yearly}).distinct("Title")
    .then(info => res.status(200).json(info))
    .catch(err => res.status(404).json({msg: 'no years found'}))
})

module.exports = router