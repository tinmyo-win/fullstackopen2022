const { isRegExp, max } = require('lodash')
var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesArray = blogs.map((blog) => blog.likes)
    const totalLikes = likesArray.reduce((sum, item) => {
        return sum + item
    }, 0)

    return totalLikes
}

const favoriteBlog = (blogs) => {
    const likesArray = blogs.map((blog) => blog.likes)
    const maxLike = Math.max(...likesArray)

    const favBlog = blogs.find((blog) => blog.likes === maxLike)

    return {
        title: favBlog.title,
        author: favBlog.author,
        url: favBlog.url,
        likes: favBlog.likes
    }
}

const mostBlog = (blogs) => {
    let authors = []

    function isExistAuthor(blog) {
        const index = authors.findIndex(obj => {
            return obj.author === blog.author
        })

        return index
    }
    
    blogs.map((blog) => {
        const index = isExistAuthor(blog)
        if(!(isExistAuthor(blog) === -1)) {
            authors[index].blogs += 1
        }
        authors.push({
            author: blog.author,
            blogs: 1
        })
    })

    let maxBlogs = Math.max(...authors.map(author => author.blogs))

    return authors.find(obj => obj.blogs === maxBlogs )
}

const mostLikes = (blogs) => {
    let authors = []

    function isExistAuthor(blog) {
        const index = authors.findIndex(obj => {
            return obj.author === blog.author
        })

        return index
    }
    
    blogs.map((blog) => {
        const index = isExistAuthor(blog)
        if(!(isExistAuthor(blog) === -1)) {
            authors[index].likes += blog.likes
        }
        authors.push({
            author: blog.author,
            likes: blog.likes
        })
    })

    let maxLikes = Math.max(...authors.map(author => author.likes))
    return authors.find(obj => obj.likes === maxLikes )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes
}