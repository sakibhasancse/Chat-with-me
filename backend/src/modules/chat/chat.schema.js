import mongoose from 'mongoose'
import Nid from 'nid'
import { CreatedBySchemas, Id } from '../common/common.model.js'
const { Schema } = mongoose

const chatSchema = new Schema(
  [
    CreatedBySchemas,
    {
      createdBy: {
        type: String,
        require: true
      },
      _id: {
        type: String
      },
      participants: [{
        userId: {
          type: String,
          require: true
        },
        _id: 0
      }],
      lastMessage: {
        type: String
      },
      lastMessageAt: {
        type: Date
      }
    }
  ],
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }
)

chatSchema.pre('save', function (next) {
  this._id = Nid(17)
  next()
})
export default chatSchema
