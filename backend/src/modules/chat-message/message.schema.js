import mongoose from 'mongoose'
import Nid from 'nid'
import { CreatedBySchemas, Id } from '../common/common.model.js'
const { Schema } = mongoose

const messageSchema = new Schema(
  [
    CreatedBySchemas,
    {
      createdBy: {
        type: String,
        require: true
      },
      content: {
        type: String
      },
      isFile: {
        type: Boolean,
        default: false
      },
      chatId: {
        type: String,
        require: true
      }
    }],
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }
)
messageSchema.pre('save', function (next) {
  this._id = Nid(17)
  next()
})
export default messageSchema
