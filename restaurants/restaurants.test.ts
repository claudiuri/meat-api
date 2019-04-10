import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address

test('get /restaurants', ()=>{
  return request(address)
    .get('/restaurants')
    .then(response =>{
        expect(response.status).toBe(200)
        expect(response.body.items).toBeInstanceOf(Array)
    }).catch(fail)
})

test('post /restaurants', ()=>{
  return request(address)
    .post('/restaurants')
    .send({
        name: 'Burger House',
        menu: [{name: "Pastel", price: 10}]
      })
    .then(response =>{
        expect(response.status).toBe(200)
        expect(response.body._id).toBeDefined() //verifica se o atributo é undefined
        expect(response.body.name).toBe('Burger House')
        expect(response.body.menu).toBeInstanceOf(Array)
        expect(response.body.menu).toHaveLength(1)
        expect(response.body.menu[0]).toMatchObject({name: "Pastel", price: 10})
    }).catch(fail)
})

test('get /restaurants/aaaa - not found', () => {
    return request(address)
    .get('/restaurants/aaaa')
    .then(response =>{
        expect(response.status).toBe(404)
    }).catch(fail)
})

test('delete /restaurants:/id', ()=>{
    return request(address)
              .post('/restaurants')
              .send({
                name: 'usuario 3',
                email: 'user3@gmail.com',
                password: '123456',
                cpf: '187.638.581-26'
              }).then(response => request(address)
                       .delete(`/restaurants/${response.body._id}`))
                .then(response=>{
                  expect(response.status).toBe(204)
             }).catch(fail)
  
})
