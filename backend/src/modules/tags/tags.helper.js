import { TagCollection } from "./tags.model.js"

export const getTag = async(query = {}) => {
    const Tag = await TagCollection.findOne(query)
    return Tag
}