import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import messageSchema from './message.schema.js'

export const MessageCollection = mongoose.model('messages', messageSchema)
