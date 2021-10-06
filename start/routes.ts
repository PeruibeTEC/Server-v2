import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users', 'UsersController.create')
}).prefix('apiV2')
