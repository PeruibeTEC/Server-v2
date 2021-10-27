import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'User/UsersController.create');
    Route.get('/', 'User/UsersController.index');
    Route.get('/:id', 'User/UsersController.show');
    Route.delete('/', 'User/UsersController.delete');
    Route.put('/', 'User/UsersController.update');
  }).prefix('users');

  Route.group(() => {
    Route.post('/login', 'AuthController.login');
    Route.delete('/logout', 'AuthController.logout');
  }).prefix('auth');

  Route.group(() => {
    Route.post('/', 'Business/BusinessTypesController.create');
    Route.get('/', 'Business/BusinessTypesController.index');
    Route.get('/:id', 'Business/BusinessTypesController.show');
    Route.delete('/', 'Business/BusinessTypesController.delete');
    Route.put('/', 'Business/BusinessTypesController.update');
  }).prefix('business_type');
}).prefix('apiV2');
