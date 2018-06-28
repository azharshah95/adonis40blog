'use strict'
const Post = use('App/Models/Post')
const User = use('App/Models/User')
class AuthRight {
  async handle ({ request, auth, params, response }, next) {
    // call next to advance the request
    const post = await Post.find(params.id)

    if (auth.user.id != post.user_id) {
        //console.log('You are not logged in!')
        return response.redirect('/login')
    }

    await next()
  }
}

module.exports = AuthRight
