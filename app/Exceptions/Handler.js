'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response, session, view }) {
    
    response.status(error.status).send(error.message)
    if (error.name === 'HttpException' || error.status === 404) {
      console.log('Error 404')
      session.withErrors(error.messages).flashAll()
      await session.commit()
      return response.send(view.render('error'))
    }
    else if (error.name === 'InvalidSessionException') {
      console.log('Error 401')
      session.withErrors(error.messages).flashAll()
      await session.commit()
      // return response.send(view.render('register.login'))
      return response.redirect('/login')
    }
    // else if (error.status === 500) {
    //   console.log('Error 500')
    //   session.withErrors(error.messages).flashAll()
    //   await session.commit()
    //   //return response.send(view.render('register.login'))
    //   return response.redirect('/posts')
    // }
    return super.handle(...arguments)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
