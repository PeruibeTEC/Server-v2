import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'UsersController.create')
  }).prefix('users')
}).prefix('apiV2')
