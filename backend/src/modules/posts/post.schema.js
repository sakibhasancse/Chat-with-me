import mongoose from 'mongoose'
import Nid from 'nid'
const { Schema } = mongoose

const postSchema = new Schema(
  {
    _id: {
      type: String
    },
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

postSchema.pre('save', function (next) {
  this._id = Nid(17)
  next()
})
export default postSchema
