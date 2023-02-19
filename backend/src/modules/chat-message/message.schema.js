import mongoose from 'mongoose'
const { Schema } = mongoose

const messageSchema = new Schema(
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
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }
)

export default messageSchema
