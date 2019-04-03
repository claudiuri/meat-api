import {Server} from './server/server'
import {usersRouter} from './users/users.router'
import {restaurantsRouter} from './restaurants/restaurants.router'

const server = new Server()

server.bootstrap([usersRouter, restaurantsRouter]).then(server =>{
    console.log('Server is litening on:', server.application.address())
}).catch(error => {
    console.log('Server failed to Start')
    console.error(error)
    process.exit(1) //saida anormal
})