import _ from "lodash"
import slugify from "slugify"
import { CustomError } from "../../app/error.js"
import { TagCollection } from "./tags.model.js"

export const GetTags = async (req, res, next) => {
  try {
    const tags = await TagCollection.find({})
    return res.status(200).json(tags)
  } catch (error) {
    return next(error)
  }
}



export const createTag = async (req, res, next) => {
  try {
    const { body = {} } = req
    const { description, name } = body

    if (!name) throw new CustomError(404, 'Name is required')

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true
    })

    const Tag = await new TagCollection({
      description,
      slug,
      name
    }).save()

    return res.status(201).json(Tag)
  } catch (error) {
    return next(error)
  }
}

export const createTags = async (tags) => {
  try {
    for (const name of tags) {
      const slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true
      })

      const test = await TagCollection.updateOne({ slug }, {
        $set: {
          slug,
          name
        }
      }, { upsert: true })
    }
  } catch (error) {
    return error
  }
}