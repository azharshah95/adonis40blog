'use strict'

class LatestComment {
  register (Model, options) {
    Model.queryMacro('latestComment', function () {
      this.orderBy('created_at','desc')
      // this.max('created_at')
      return this
    })
  }
}

module.exports = LatestComment
