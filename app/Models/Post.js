'use strict'

const Model = use('Model')

class Post extends Model {

    // static getLatest(){
    //   this.latest()
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

    //METHODS

    // static latest() {
    //   return this
    // }
}

module.exports = Post
