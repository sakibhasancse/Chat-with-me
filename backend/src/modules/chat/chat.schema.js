import mongoose from 'mongoose'
import { CreatedBySchemas, Id } from '../common/common.model.js'
const { Schema } = mongoose

const chatSchema = new Schema(
  [Id,
    CreatedBySchemas,
    {
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

export default chatSchema
