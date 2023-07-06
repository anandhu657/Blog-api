const CommentModel = require('../Model/comment.model');
const PostModel = require('../Model/post.model');

module.exports = {
    /*
    -ADD COMMENT TO A BLOG POST
    -FIRST, FIND THE POST BY POSTID IF THE POST IS EXISTED
    -THEN, COMMENT IS CREATED AT COMMENT COLLECTION
    -AFTER THAT, THE ID OF THE COMMENT IS STORED IN THE POST COLLECTION
    */
    addComment: async (req, res, next) => {
        try {
            const commentBody = req.body;
            commentBody.user = res.locals.id;
            const blogPost = await PostModel.findById(commentBody.post);
            if (blogPost) {
                const commentId = await CommentModel.create(commentBody); // CREATE NEW COMMENT
                if (commentId) {
                    blogPost.comments.push(commentId); //ADD THE ID OF THE COMMENT
                    blogPost.commentsCount++; //INCREMENT THE COMMENT COUNT
                    await blogPost.save();
                }
            } else {
                const error = new Error("Blog post not found");
                error.statusCode = 404
                throw error;
            }
        } catch (err) {
            next(err);
        }
    },
    

    /*
    -LIST COMMENTS FOR A SPECIFIC BLOG POST
    -FIND THE COMMENTS USING THE BLOG POST ID AND POPULATE THE USER DETAILS FROM USER COLLECTION
    */
    specificBlogComment: async (req, res, next) => {
        try {
            const blogPostId = req.params.postId;
            if (blogPostId) {
                const comments = await CommentModel
                    .find({ post: blogPostId })
                    .populate({
                        path: 'user',
                        select: 'username -_id'
                    })
                    .select('text -_id')
                    .exec();
                if (comments)
                    res.status(200).json(comments);
                else
                    res.status(204).json({ message: "No comments" });
            }
        } catch (err) {
            if (err.name == 'CastError') {
                return res.status(400).json({ message: "Invalid id format" });
            }
            next(err);
        }
    }
}