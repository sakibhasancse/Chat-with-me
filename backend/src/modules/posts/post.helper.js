import { PostCollection } from './post.model.js'

export const getPosts = async (query = {}, options = {}) => {
  const { sort = { createdAt: -1 }, skip = 0, limit = 50 } = options
  const posts = await PostCollection.find(query).sort(sort).skip(skip).limit(limit)
  return posts
}

export const getPost = async (query) => {
  const product = await PostCollection.findOne(query)
  return product
}


export const postsSearchQuery = ({ keyword, category, userId }) => {
  const query = {
    title: {
      $regex: keyword,
      $options: 'i'
    }
  }
  if (category) query.category = category
  if (userId) query.createdBy = userId
  return query
}

export const postsWishListPipeline = (userId) => {
  const wishListPipeline = [
    {
      $lookup: {
        from: 'wishlists',
        let: { userId },
        pipeline: [
          {
            $match: {
              $and: [{ $expr: { $eq: ['$$userId', '$userId'] } }]
            }
          }
        ],
        as: 'wishlist'
      }
    },
    {
      $addFields: {
        wishlistIds: {
          $reduce: {
            input: '$wishlist.posts',
            initialValue: [],
            in: {
              $concatArrays: ['$$value.product', '$$this.product']
            }
          }
        }
      }
    },
    {
      $project: {
        _id: 1,
        description: 1,
        imageUrl: 1,
        isLiked: {
          $in: ['$_id', '$wishlistIds']
        },
        name: 1,
        price: 1
      }
    }
  ]
  return wishListPipeline
}

export const userInfoPipeline = [{
  $lookup: {
    // localField: 'createdBy',
    // foreignField: '_id',
    let: { createdBy: '$createdBy' },
    from: 'users',
    as: 'creator',
    pipeline: [
      {
        $match: {
          $and: [{ $expr: { $eq: ['$$createdBy', '$_id'] } }]
        }
      },
      { $limit: 1 },
      {
        $project: {
          'name': 1,
          userId: '$_id',
          username: 1
        }
      }
    ]
  }
},
{
  $addFields: {
    creator: {
      $first: '$creator'
    }
  }

}
]

export const getPostsWithOtherInfo = async (params) => {

  const { userId = '', query = {}, options = {} } = params
  const { sort = { createdAt: -1 }, skip = 0, limit = 50 } = options
  const posts = await PostCollection.aggregate([
    {
      $match: query
    },
    // ...postsWishListPipeline(userId),
    ...userInfoPipeline,
    {
      $sort: sort
    },
    { $skip: skip },
    { $limit: limit }
  ])
  return posts
}

export const getPostsCount = async (query = {}) => {
  const postsCount = await PostCollection.countDocuments(query)
  return postsCount
}