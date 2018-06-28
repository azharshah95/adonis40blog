'use strict'

const Model = use('Model')

class Comment extends Model {

    user () {
        return this.belongsTo('App/Models/User')
      }

    post () {
        return this.belongsTo('App/Models/Post')
    }  
}

module.exports = Comment
