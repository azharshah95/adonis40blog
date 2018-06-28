'use strict'

//const geoip = use('geoip-lite')

class CountryDetector {
  async handle ({ request }, next) {
    //const ip = request.ip()
    request.country = 'azhar shah'
    await next()
  }
}

module.exports = CountryDetector
