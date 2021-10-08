import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'User/UsersController.create');
    Route.get('/', 'User/UsersController.index');
    Route.get('/:id', 'User/UsersController.show');
  }).prefix('users');
}).prefix('apiV2');
