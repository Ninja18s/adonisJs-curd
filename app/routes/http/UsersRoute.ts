import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

    Route.put('/',
        'UsersController.editUserDetails');
    Route.get('/', 'UsersController.getUserById')
    Route.post('/', 'UsersController.createProfile')
    Route.delete('/', 'UsersController.deleteProfile')
}).prefix('user/profile').middleware('auth')