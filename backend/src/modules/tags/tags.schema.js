import mongoose from 'mongoose'
import Nid from 'nid';

const TagSchema = new mongoose.Schema({
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
    description: {
        type: String,
        default: null
    }
});

TagSchema.pre('save', function(next) {
    this._id = Nid(17)
    next()
})

export default TagSchema