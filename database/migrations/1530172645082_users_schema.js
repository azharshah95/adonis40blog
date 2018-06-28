'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.integer('user_type').default(1)
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UsersSchema
