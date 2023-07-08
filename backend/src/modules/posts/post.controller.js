import _ from 'lodash'
import slugify from 'slugify'

import { CustomError } from '../../app/error.js'
import { categoryHelper, postHelper } from '../helpers.js'
import { createTags } from '../tags/Tag.controller.js'
import { PostCollection } from './post.model.js'

export const getPosts = async (req, res, next) => {
  try {
    const { user = {} } = req
    const { keyword = '', category, sort = { createdAt: -1 } } = req?.query
    const limit = Number(req?.query.limit || 50)
    const skip = Number(req?.query.skip || 0)
    const { userId } = user

    let categoryInfo
    if (category) {
      categoryInfo = await categoryHelper.getCategory({ slug: category })
      console.log({ categoryInfo });
      if (!categoryInfo) throw new CustomError(400, 'Category not found')
    }

    let posts = []
    const searchQuery = postHelper.postsSearchQuery({ keyword, category: categoryInfo?._id })
    const options = { limit, skip, sort }
    // if (userId) {
    posts = await postHelper.getPostsWithOtherInfo({
      query: searchQuery,
      userId,
      options
    })
    // } else {
    //   posts = await postHelper.getPosts(searchQuery, options)
    // }
    const totalDocuments = await postHelper.getPostsCount(searchQuery)

    const totalPages = Math.ceil(totalDocuments / limit)
    const currentPage = Math.ceil(skip / limit) + 1

    return res.status(200).json({
      data: posts,
      paging: {
        totalDocuments,
        currentPage: totalPages > currentPage ? currentPage : totalPages,
        totalPages,
      },
    })
  } catch (error) {
    return next(error)
  }
}

export const getPost = async (req, res, next) => {
  try {
    const { user = {}, params = {} } = req
    const { userId } = user
    const { slug } = params
    let post = {}
    if (userId) {
      post = await postHelper.getPostsWithOtherInfo({
        query: {
          slug
        },
        userId
      })
    } else {
      post = await postHelper.getPost({ slug })
    }
    return res.status(200).json(post)
  } catch (error) {
    return next(error)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const { user = {}, body = {} } = req
    const { description, title, tags } = body
    console.log({ body })
    if (!title) throw new CustomError(404, 'Name is required')
    if (!description) throw new CustomError(404, 'Description is required')

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true
    })
    const existsPost = await PostCollection.find({
      slug
    })
    if (_.size(existsPost)) throw new CustomError(400, 'Post already exists with this title')

    if (tags) {
      await createTags(tags)
    }
    const newPosts = new PostCollection({
      title, description, tags, slug, createdBy: user.userId
    })
    const post = await newPosts.save()
    return res.status(200).json(post)
  } catch (error) {
    return next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { user = {}, params = {} } = req
    const { userId } = user
    const { postId } = params

    const post = await PostCollection.deleteOne({ _id: postId, createdBy: userId })
    if (!_.size(post)) {
      throw new CustomError(404, 'Post not found')
    }
    res.status(200).json({
      message: 'Successfully removed post',
      code: 200
    })
  } catch (error) {
    return next(error)
  }
}
export const getPostsByCategory = async () => {
  try {
    const { params = {} } = req
    const { category } = params
    const { userId } = user
    const categoryInfo = await categoryHelper.getCategory({ slug: category })
    if (!categoryInfo) throw new CustomError(400, 'Category not found')

    let posts = []
    if (userId) {
      posts = await postHelper.getPostsWithOtherInfo({
        query: {
          category: categoryInfo._id
        },
        userId
      })
    } else {
      posts = await postHelper.getPosts({ category: categoryInfo._id })
    }
    return res.status(200).json(posts)
  } catch (error) {
    return next(error)
  }
}


export const getPostsByUser = async (req, res, next) => {
  try {
    console.log('callin')
    const { user = {} } = req
    const { keyword = '', category, sort = { createdAt: -1 } } = req?.query
    const limit = Number(req?.query.limit || 50)
    const skip = Number(req?.query.skip || 0)
    const { userId } = user

    if (!(userId || req.params?.userId)) {
      throw new CustomError(400, 'Required userId')
    }

    let categoryInfo
    if (category) {
      categoryInfo = await categoryHelper.getCategory({ slug: category })
      console.log({ categoryInfo });
      if (!categoryInfo) throw new CustomError(400, 'Category not found')
    }

    let posts = []
    const searchQuery = postHelper.postsSearchQuery({ keyword, category: categoryInfo?._id, userId: req.params.userId || userId })
    console.log(searchQuery)
    const options = { limit, skip, sort }
    if (userId) {
      posts = await postHelper.getPostsWithOtherInfo({
        query: searchQuery,
        userId,
        options
      })
    } else {
      posts = await postHelper.getPosts(searchQuery, options)
    }
    const totalDocuments = await postHelper.getPostsCount(searchQuery)

    const totalPages = Math.ceil(totalDocuments / limit)
    const currentPage = Math.ceil(skip / limit) + 1

    return res.status(200).json({
      data: posts,
      paging: {
        totalDocuments,
        currentPage: totalPages > currentPage ? currentPage : totalPages,
        totalPages,
      },
    })
  } catch (error) {
    console.log("error", error)
    return next(error)
  }
}
