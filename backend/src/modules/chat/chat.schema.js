import mongoose from 'mongoose'
const { Schema } = mongoose

const chatSchema = new Schema(
  {
    createdBy: {
      type: String,
      require: true,
      unique: true
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
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }
)

export default chatSchema
