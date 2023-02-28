import mongoose from 'mongoose'
import postSchema from './post.schema.js'

export const PostCollection = mongoose.model('posts', postSchema)
