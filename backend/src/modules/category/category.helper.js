import { CategoryCollection } from "./category.model.js"

export const getCategory = async (query = {}) => {
  const category = await CategoryCollection.findOne(query)
  return category
}