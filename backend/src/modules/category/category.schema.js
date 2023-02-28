import mongoose from 'mongoose'
import Nid from 'nid';

const CategorySchema = new mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  image: {
    url: String,
    public_id: String
  },
});

CategorySchema.pre('save', function (next) {
  this._id = Nid(17)
  next()
})

export default CategorySchema