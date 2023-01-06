import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

    Route.patch('/',
        'UsersController.editUserDetails');
    Route.get('/:id', 'UsersController.getUserById')
}).prefix('user/profile').middleware('auth')