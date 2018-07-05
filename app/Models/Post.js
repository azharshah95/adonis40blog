'use strict'

const Model = use('Model')

class Post extends Model {

    static boot () {
      super.boot()
      this.addTrait('Latest')
    }

    // static scopeLatest (query) {
    //   return query.orderBy('updated_at','desc')
    // }

    //RELATIONSHIP
    user () {
        return this.belongsTo('App/Models/User')
      }

    author () {
      return this.belongsTo('App/Models/User')
    }

    comments () {
      return this.hasMany('App/Models/Comment')
    }
    
}

module.exports = Post
