import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'User/UsersController.create');
    Route.get('/', 'User/UsersController.index');
    Route.get('/:id', 'User/UsersController.show');
    Route.delete('/:id', 'User/UsersController.delete');
  }).prefix('users');
}).prefix('apiV2');
