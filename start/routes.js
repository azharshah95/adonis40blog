'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')
Route.on('/home').render('home').as('home')
//Route.on('/').render('home')

Route.get('/posts', 'PostController.index').as('posts')

Route.get('/posts/add', 'PostController.add').as('add').middleware(['auth:session,jwt'])

Route.get('/posts/edit/:id', 'PostController.edit').as('edit').middleware(['rights'])

Route.get('/posts/:id', 'PostController.details').as('postDetails')

Route.post('/posts', 'PostController.store').as('postStore')

Route.post('/posts/image', 'PostController.imageStore').as('imageStore')

Route.put('/posts/:id', 'PostController.update').as('postUpdate').middleware(['auth:session,jwt'])

Route.delete('/posts/:id', 'PostController.destroy').as('postDestroy')

//Route.get('/comments/:id', 'PostController.details')
Route.post('/comments/:id', 'CommentController.storeComment').as('storeComment')
Route.delete('/comments/:id', 'CommentController.destroyComment').as('destroyComment')

Route.on('/register').render('register/register')
Route.get('/register', 'Auth/RegisterController.showRegisterForm')
Route.post('/register', 'Auth/RegisterController.register').as('register')
Route.get('/register/confirm/:token', 'Auth/RegisterController.confirmEmail')
Route.get('/login', 'Auth/LoginController.showLoginForm')
Route.post('/login', 'Auth/LoginController.login').as('login')
Route.get('/logout', 'Auth/AuthenticatedController.logout').as('logout')