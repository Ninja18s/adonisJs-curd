import Route from '@ioc:Adonis/Core/Route'


Route.get('/', 'UsersController.getUsers').prefix('user')