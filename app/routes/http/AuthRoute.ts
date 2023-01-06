import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {

    Route.post('/register',
        'AuthController.registerUser')
    Route.post('/login',
        'AuthController.loginUser')
    Route.post('/logout',
        'AuthController.logoutUser').middleware('auth')
}).prefix('auth');
