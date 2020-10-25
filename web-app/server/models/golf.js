const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const GolfSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  tournament: {
    type: String,
    required: true,
  },
  ranktw: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rounds: {
    type: Number,
    required: true,
  },
  average: {
    type: SchemaTypes.Double,
    required: true,
  },
  totalstrokes: {
    type: Number,
    required: true,
  },
  totaladjustment: {
    type: SchemaTypes.Double,
    required: true,
  },
  totalrounds: {
    type: Number,
    required: true,
  }


})

module.exports = Golf = mongoose.model('Golf', GolfSchema, 'Scoring')