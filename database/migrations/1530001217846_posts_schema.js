'use strict'

const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      // alter table
      table.string('image')
    })
  }

  down () {
    this.table('posts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PostsSchema
