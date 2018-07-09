'use strict'

const Model = use('Model')

class Comment extends Model {

    static boot () {
        super.boot()
        this.addTrait('Latest')
        this.addTrait('Earlier')
      }

    user () {
        return this.belongsTo('App/Models/User')
      }

    post () {
        return this.belongsTo('App/Models/Post')
    }
}

module.exports = Comment
