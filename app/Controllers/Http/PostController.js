'use strict'

// Bring in model
const Post = use('App/Models/Post')
// const User = use('App/Models/User')
const Comment = use('App/Models/Comment')
const Helpers = use('Helpers')
// const Database = use('Database')

// Bring in validator
const { validate } = use('Validator')

class PostController {

    async index({ view }) { 
        const posts = await Post            
            .query()
            .with('user')
            .with('lastComment')
            .latest() //Post Trait
            .withCount('comments')
            // .with('comments', (builder)=>builder.with('post').first())
            .fetch()
        
        const postsList = posts.toJSON()
        // console.log(postsList)

        return view.render('posts.index', {
            title: 'Latest Posts',
            posts: postsList
        })        
    }

    async details({ params, view }) {
        const post = await Post
            .query()  
            .with('comments.user')         
            .with('user')
            .where('id','=',`${params.id}`)
            .latest()
            .first()

        return view.render('posts.details', {
          post: post.toJSON(),
          image: post.image
        })
      }

    async add({ view }) {        
        return view.render('posts.add')
    }

    async store({ request, response, session, auth }) {
        // Validate input
        //return request.all()
         
        const validation = await validate(request.all(), { 
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('/back')
        }

        const post = new Post();
        
        const File = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        await File.move(Helpers.publicPath('uploads_'+`${auth.user.username}`), {
            name: `${File.clientName}`
        })

        if (!File.moved()) {
            //console.log('file not uploaded')
            //return File.error()
        } else {
            post.image = `/uploads_${auth.user.username}/${File.clientName}`;
        }
        
        //STORING IN DB 
        
        post.title = request.input('title')
        post.body = request.input('body')
        post.user_id = auth.user.id
        
        await post.save()
        session.flash({ notification: 'Post Added!' })
        return response.redirect('/posts')
    }

    async edit({ params, view }) {    
        const post = await Post.find(params.id)
        
        return view.render('posts.edit', {
            post: post
        })
    }

    async update({ params, request, response, session }) {
        // Validate input
        const validation = await validate(request.all(), { 
            title: 'required|min:3|max:255',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('/back')
        }

        const post = await Post.find(params.id);

        post.title = request.input('title')
        post.body = request.input('body')

        await post.save()

        session.flash({ notification: 'Post Updated!' })
        
        return response.redirect('/posts')
    }

    async destroy({ params, session, response }) {
        const post = await Post.find(params.id)
        
        await post.delete()
        
        session.flash({ notification: 'Post Deleted!' })
        return response.redirect('/posts')
    }
}
module.exports = PostController
