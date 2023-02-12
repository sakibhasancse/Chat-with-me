import _ from "lodash"
import slugify from "slugify"
import { CustomError } from "../../app/error.js"
import { CategoryCollection } from "./category.model.js"

export const GetCategories = async (req, res, next) => {
  try {
    const categories = await CategoryCollection.find({})
    const withSubCategory = nestedCategories(categories)
    return res.status(200).json(withSubCategory)
  } catch (error) {
    return next(error)
  }
}

const nestedCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter(cat => cat.parent_id == null);
  } else {
    category = categories.filter(cat => String(cat.parent_id) == String(parentId));
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: nestedCategories(categories, cate._id)
    })
  }
  return categoryList;
}

export const createCategory = async (req, res, next) => {
  try {
    const { body = {} } = req
    const { imageUrl, description, name, parent_id = null } = body

    if (!name) throw new CustomError(404, 'Name is required')

    if (parent_id) {
      const patentCategory = await CategoryCollection.find({
        _id: parent_id
      })
      if (!_.size(patentCategory)) throw new CustomError(404, 'Parent category not found')
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true
    })

    const category = await new CategoryCollection({
      description,
      slug,
      name,
      parent_id,
      image: {
        url: imageUrl
      }
    }).save()

    return res.status(201).json(category)
  } catch (error) {
    return next(error)
  }
}
