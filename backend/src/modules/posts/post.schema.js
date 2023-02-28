import mongoose from 'mongoose'
const { Schema } = mongoose

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String
    },
    tags: {
      type: Array
    },
    createdBy: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }
  }
)

export default postSchema
