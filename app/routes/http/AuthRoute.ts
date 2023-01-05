import Route from '@ioc:Adonis/Core/Route'


Route.post('/register',
    'AuthController.registerUser').prefix('auth');
Route.post('/login',
    'AuthController.loginUser').prefix('auth');
