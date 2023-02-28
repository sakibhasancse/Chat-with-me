import mongoose from 'mongoose'
import Nid from 'nid'
import { CreatedBySchemas, Id } from '../common/common.model.js'
const { Schema } = mongoose

const userSchema = new Schema(
  [
    CreatedBySchemas,
    {
      _id: {
        type: String
      },
      email: {
        type: String,
        require: true,
        unique: true
      },
      name: {
        type: String,
        require: true
      },
      password: {
        type: String,
        require: true
      },
      phoneNumber: {
        type: Number,
        require: true
      }
    }],
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }
)

userSchema.pre('save', function (next) {
  this._id = Nid(17)
  next()
})
export default userSchema
