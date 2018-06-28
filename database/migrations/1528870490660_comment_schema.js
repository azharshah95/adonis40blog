'use strict'

const Schema = use('Schema')

class CommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('post_id').unsigned()
      table.string('comment_body','255').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentSchema
