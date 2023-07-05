import mongoose from 'mongoose'
import TagSchema from './tags.schema.js'

export const TagCollection = mongoose.model('tags', TagSchema)