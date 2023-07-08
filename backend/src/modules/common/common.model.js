import mongoose from 'mongoose'
import nid from 'nid'

export const Id = new mongoose.Schema({
  _id: {
    type: String,
    immutable: true
  }
})

export const CreatedBySchemas = new mongoose.Schema({
  createdBy: {
    type: String,
    immutable: true,
    default: 'SYSTEM'
  }
})

Id.pre('save', function (next) {
  // For Seed:
  if (process.env.NODE_ENV === 'test') {
    this._id = this._id ? this._id : nid(17)
  } else {
    console.log('caalling')
    this._id = nid(17)
  }
  next()
})