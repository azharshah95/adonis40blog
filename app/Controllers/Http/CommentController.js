'use strict'

// Bring in model
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Comment = use('App/Models/Comment')

// Bring in database
const Database = use('Database')

// Bring in validator
const { validate } = use('Validator')

class CommentController {

    async storeComment({ params, request, response, session, auth }) {
        const newComment = new Comment();
        const post = await Post.find(params.id)
        
        newComment.comment_body = request.input('comment_body')        
  
        newComment.post_id = post.id
        newComment.user_id = auth.user.id
        await newComment.save()

        session.flash({ notification: 'Comment Added!' })
        
        return response.redirect(`/posts/${newComment.post_id}`)
        // return response.redirect('/posts')
        
    }

    async destroyComment({ params, session, response }) {
        const destroy = await Comment.find(params.id)
        await destroy.delete()
        session.flash({ notification: 'Comment Deleted!' })
        return response.redirect(`/posts/${destroy.post_id}`)
        // return response.redirect(`'postDetails { id: ${destroy.post_id} }'`)
    }
    
}

module.exports = CommentController