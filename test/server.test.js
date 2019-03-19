const app = require('../server')
const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')

describe('App', function(){
    it('Should return hello', function(){
        let result = app.test()
        assert.equal(result, 'Hello')
    });

    it('Should return string', function(){
        let result = app.test()
        assert.typeOf(result, 'string')
    });
})

chai.use(chaiHttp)
describe('GET /get-college', () => {
    it('Should return college list', (done) => {
        chai.request(app)
            .get('/get-college')
            .end((err, res) => {
                chai.assert.equal(res.status, '200')
                assert.typeOf(res.body, 'array')
                done();
            })
    })
})

describe('GET /get-c-s/:clgid', () => {
    it('Should return required clg', (done) => {
        chai.request(app)
            .get('/get-c-s/4')
            .end((err, res) => {
                assert.equal(res.status, '200')
                assert.lengthOf(res.body, 1)
                assert.typeOf(res.body, 'array')
                done()
            })
    })
})

describe('GET /get-raw-students', () => {
    it('Should return array of students using raw query', (done) => {
        chai.request(app)
            .get('/get-raw-students')
            .end((err, res) => {
                assert.equal(res.status, '200')
                assert.typeOf(res.body, 'array')
                done()
            })
    })
})

// describe('POST /add-uni', () => {
//     it('should add university', (done) => {
//         var data = {
//             name: 'Demo Uni',
//             region: 'Demo Region'
//         }
//         chai.request(app)
//             .post('/add-uni')
//             .send(data)
//             .end((err, res) => {
//                 assert.equal(res.status, '200')
//                 assert.equal(res.body.success, 'success')
//                 done()
//             })
//     })
// })