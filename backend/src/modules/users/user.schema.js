import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }
)

export default userSchema
