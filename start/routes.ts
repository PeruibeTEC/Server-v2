import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'UsersController.create');
    Route.get('/:id', 'UsersController.get');
  }).prefix('users');
}).prefix('apiV2');
