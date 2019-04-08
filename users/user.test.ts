import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address

test('get /users', ()=>{
  return request(address)
    .get('/users')
    .then(response =>{
        expect(response.status).toBe(200)
        expect(response.body.items).toBeInstanceOf(Array)
    }).catch(fail)
})

test('post /users', ()=>{
  return request(address)
    .post('/users')
    .send({
        name: 'usuario1',
        email: 'usuario@email.com',
        password: '123456',
        cpf: '07880622551'
    })
    .then(response =>{
        expect(response.status).toBe(200)
        expect(response.body._id).toBeDefined() //verifica se o atributo é undefined
        expect(response.body.name).toBe('usuario1')
        expect(response.body.email).toBe('usuario@email.com')
        expect(response.body.cpf).toBe('07880622551')
        expect(response.body.password).toBeUndefined()
    }).catch(fail)
})

test('get /users/aaaa - not found', () => {
    return request(address)
    .get('/users/aaaa')
    .then(response =>{
        expect(response.status).toBe(404)
    }).catch(fail)
})

test('patch /users/:id', () =>{
    return request(address)
        .post('/users')
        .send({
            name: 'usuario2',
            email: 'usuario2@email.com',
            password: '123456'
        })
        .then(response => request(address)
                            .patch(`/users/${response.body._id}`)
                            .send({
                                name: 'usuario2 - patch'
                            }))
        .then(response =>{
            expect(response.status).toBe(200)
            expect(response.body._id).toBeDefined() //verifica se o atributo é undefined
            expect(response.body.name).toBe('usuario2 - patch')
            expect(response.body.email).toBe('usuario2@email.com')
            expect(response.body.password).toBeUndefined()
        })
        .catch(fail)
})

test('findByEmail /users/', () =>{
    return request(address)
        .post('/users')
        .send({
            name: 'usuario2',
            email: 'usuario2@email.com',
            password: '123456'
        })
        .then(response => request(address)
                            .get(`/users/`)
                            .query({email: response.body.email}))
        .then(response =>{
            expect(response.status).toBe(200)
        })
        .catch(fail)
})

test('delete /users:/id', ()=>{
    return request(address)
              .post('/users')
              .send({
                name: 'usuario 3',
                email: 'user3@gmail.com',
                password: '123456',
                cpf: '187.638.581-26'
              }).then(response => request(address)
                       .delete(`/users/${response.body._id}`))
                .then(response=>{
                  expect(response.status).toBe(204)
             }).catch(fail)
  
})
