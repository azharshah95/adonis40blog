'use strict'
const Post = use('App/Models/Post')
const User = use('App/Models/User')
class AuthRight {
  async handle ({ auth, params, response, session }, next) {
    // call next to advance the request
    const post = await Post.find(params.id)
    const author = await Post
      .query()
      .with('user')
      .where('id','=',`${params.id}`)
      .first()

    const name = author.toJSON()

    if (!auth.user) {
      session.flash({
        notification: {
          type: 'danger',
          message: `Please login as ${name.user.username}`
        }
      })
      return response.redirect('/login')
    } 
    else if (auth.user.id != post.user_id) {      
        session.flash({
          notification: {
            type: 'danger',
            message: `Please login as ${name.user.username}`
          }
        })
        return response.redirect('/login')  
    } 

    await next()
  }

}

module.exports = AuthRight
