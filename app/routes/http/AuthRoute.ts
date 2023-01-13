import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

    Route.post('/register',
        'AuthController.registerUser')
    Route.post('/login',
        'AuthController.loginUser')
}).prefix('auth');
