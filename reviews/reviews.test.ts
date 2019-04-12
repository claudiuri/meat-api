import 'jest'
import * as request from 'supertest'
import * as mongoose from 'mongoose'

let address: string = (<any>global).address
let auth: string = (<any>global).auth

test('get /reviews', ()=>{
  return request(address)
    .get('/reviews')
    .set('Authorization', auth)
    .then(response =>{
        expect(response.status).toBe(200)
        expect(response.body.items).toBeInstanceOf(Array)
    }).catch(fail)
})

test('post /reviews', ()=>{
  return request(address)
            .post('/reviews')
            .set('Authorization', auth)
            .send({
              date: '2019-04-08T23:10:10',
              rating: 3,
              comments: 'muito bom',
              user: new mongoose.Types.ObjectId(),
              restaurant: new mongoose.Types.ObjectId()
            })
            .then(response=>{
              expect(response.status).toBe(200)
              expect(response.body._id).toBeDefined()
              expect(response.body.rating).toBe(3)
              expect(response.body.comments).toBe('muito bom')
              expect(response.body.user).toBeDefined()
              expect(response.body.restaurant).toBeDefined()
            })
            .catch(fail)
})

test('get /reviews/aaaaa - not found', ()=>{
  return request(address)
         .get('/reviews/aaaaa')
         .set('Authorization', auth)
         .then(response=>{
           expect(response.status).toBe(404)
         })
         .catch(fail)
})