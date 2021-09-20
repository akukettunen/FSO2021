const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  if(!blogs.length) return

  let favorite = blogs[0]
  blogs.forEach(blog => blog.likes > favorite.likes ? favorite = {...blog} : favorite = favorite)
  delete favorite.__v
  delete favorite._id
  delete favorite.url

  return favorite
}

const mostBlogs = (blogs) => {
  if(!blogs.length) return
  let authors_blogs = {}

  blogs.forEach(blog => {
    !!authors_blogs[blog.author] 
      ? authors_blogs[blog.author] += 1
      : authors_blogs[blog.author] = 1
  })

  let mostBlogs = { author: undefined, blogs: 0 }

  Object.keys(authors_blogs).forEach(author => {
    if(authors_blogs[author] > mostBlogs.blogs) 
      mostBlogs = {author, blogs: authors_blogs[author]}
  })

  return mostBlogs
}

const mostLikes = (blogs) => {
  if(!blogs.length) return
  let authors_likes = {}

  blogs.forEach(blog => {
    !!authors_likes[blog.author] 
      ? authors_likes[blog.author] += blog.likes
      : authors_likes[blog.author] = blog.likes
  })

  let mostLikes = { author: undefined, likes: 0 }

  Object.keys(authors_likes).forEach(author => {
    if(authors_likes[author] > mostLikes.likes) 
      mostLikes = {author, likes: authors_likes[author]}
  })

  return mostLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }