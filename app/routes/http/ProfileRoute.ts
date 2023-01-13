import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.put('/',
        'ProfileController.editUserProfileDetails');
    Route.get('/', 'ProfileController.getUserProfileById')
    Route.post('/', 'ProfileController.createProfile')
    Route.delete('/', 'ProfileController.deleteProfile')
}).prefix('user/profile').middleware('auth')