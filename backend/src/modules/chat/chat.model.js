import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import chatSchema from './chat.schema.js'

export const ChatCollection = mongoose.model('chats', chatSchema)
