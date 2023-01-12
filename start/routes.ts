import Route from '@ioc:Adonis/Core/Route'
import '../app/routes/http/ProfileRoute'
import '../app/routes/http/AuthRoute'

Route.get('/', async () => {
  return { data: 'api is running' }
})
