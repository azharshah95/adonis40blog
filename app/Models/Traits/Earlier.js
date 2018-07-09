'use strict'

class Earlier {
  register (Model, options) {
    Model.queryMacro('earlier', function () {
      this.orderBy('updated_at','asc')
      return this
    })
  }
}
module.exports = Earlier
