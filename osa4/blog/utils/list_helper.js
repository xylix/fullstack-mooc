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


module.exports = {
  dummy, totalLikes, favouriteBlog
}
