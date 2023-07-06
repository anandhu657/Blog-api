const PostModel = require('../Model/post.model');

module.exports = {
    // -CREATE NEW BLOG POST
    createBlog: async (req, res, next) => {
        try {
            const blogData = req.body;
            blogData.user = res.locals.id; //res.locals contains the payload of the token
            if (blogData) {
                await PostModel.create(blogData);
                res.status(200).json({ message: "Blog post added successfully" });
            } else
                throw new Error("Blog post details is not found");
        } catch (err) {
            next(err);
        }
    },

    /*
    -LIST ALL BLOG POST
    -FIND ALL POSTS FROM POST COLLECTION AND FETCHING USERNAME FROM USER COLLECTION USING POPULATE
    */
    getAllBlogPost: async (req, res, next) => {
        try {
            const posts = await PostModel
                .find()
                .populate(
                    {
                        path: 'user',
                        select: 'username'
                    }
                )
                .select('title description date')
                .exec();
            if (posts)
                res.status(200).json(posts);
            else
                res.status(204).json({ message: "No content found" });
        } catch (err) {
            next(err);
        }
    },

    /*
    -UPDATE AN EXISTING BLOG POST
    -IT CHECK IF THE BLOG CREATER ID AND REQUEST SENDER ID IS SAME, IT WILL UPDATE THE BLOG POST
    */
    updateBlogPost: async (req, res, next) => {
        try {
            const blogData = req.body;
            if (blogData) {
                const updateData = await PostModel.updateOne(
                    { _id: blogData.id, user: res.locals.id },
                    { "$set": blogData }
                );
                if (updateData.modifiedCount === 1)
                    res.status(200).json({ message: "Post updated successfully" });
                else
                    throw new Error("Something Wrong");
            }
        } catch (err) {
            next(err);
        }
    },

    /*
    -DELETE A BLOG POST
    - IT CHECK IF THE BLOG CREATER ID AND REQUEST SENDER ID IS SAME, IT WILL DELETE THE BLOG POST
    */
    deleteBlogPost: async (req, res, next) => {
        try {
            const id = req.params.id;
            const post = await PostModel.findById(id);
            if (!post) {
                const error = new Error("Blog post not found");
                error.statusCode = 404;
                throw error;
            }
            if (post.user == res.locals.id) {
                const result = await post.deleteOne();
                if (result)
                    res.status(200).json({ message: "Blog post deleted successfully" });
            }
            else
                throw new Error("You have no access to delete this post");
        } catch (err) {
            if (err.name == 'CastError') {
                return res.status(400).json({ message: "Invalid id format" });
            }
            next(err)
        }
    },

    /*
    - RETRIEVE A BLOG POST BY ID
    */
    getBlogPostById: async (req, res, next) => {
        try {
            const blogId = req.params.id;
            if (blogId) {
                const blogPost = await PostModel.findById(blogId);
                if (blogPost)
                    res.status(200).json(blogPost);
                else {
                    const error = new Error("Blog post not found");
                    error.statusCode = 404;
                    throw error;
                }
            }
        } catch (err) {
            if (err.name == 'CastError') {
                return res.status(400).json({ message: "Invalid id format" });
            }
            next(err);
        }
    }
}
