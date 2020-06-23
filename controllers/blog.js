const Blog = require('../models/Blog');


exports.allBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
}


exports.getOneBlog = async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog);
}


exports.newBlog = async (req, res) => {
    const blog = new Blog({
        userid: req.user._id,
        title: req.body.title,
        content: req.body.content,
    });

    // save and return new blog
    try {
        const savedUser = await blog.save();
        res.send({ blog: blog });
    } catch (err) {
        res.status(400).send(err);
    }
}
