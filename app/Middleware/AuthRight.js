'use strict'

class AuthRight {
  async handle ({ request }, next) {
    // call next to advance the request
    await next()
  }
}

module.exports = AuthRight
