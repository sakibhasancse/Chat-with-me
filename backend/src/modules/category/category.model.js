import mongoose from 'mongoose'
import CategorySchema from './category.schema.js'

export const CategoryCollection = mongoose.model('category', CategorySchema)