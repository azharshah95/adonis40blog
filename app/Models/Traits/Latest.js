'use strict'

class Latest {
  register (Model, options) {
    Model.queryMacro('latest', function () {
      this.orderBy('updated_at','desc')
      return this
    })
  }
}
module.exports = Latest