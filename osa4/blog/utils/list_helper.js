const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accum, blog) => accum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  max = -1
  index = -1
  blogs.forEach((blog, i) => {
    if (blog.likes > max) {
      max = blog.likes;
      index = i;
    }
  });
  return blogs[index]
}

const mostBlogs = (blogs) => {
  const authors = {}
  blogs.forEach(blog => {
    if (authors[blog.author]) {
      authors[blog.author] += 1
    } else {
      authors[blog.author] = 1
    }
  })
  let max = -1
  let author = ''
  for (const [key, value] of Object.entries(authors)) {
    if (value > max) {
      max = value
      author = key
    }
  }
  return { author, blogs: max }

}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs
}
