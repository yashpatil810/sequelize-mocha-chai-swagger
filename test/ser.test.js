const app = require('../server')

const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('TEST TEST', () => {
    it('Test', (done) => {
        let x = 9
        assert.equal(x, 9)
        done()
    })
})

describe('UPDATE /update-student-name', () => {
    it('SHOULD UPDATE STUDENT NAME', (done) => {
        let data = {
            name: 'Yash New',
            id: 13
        }
        chai.request(app)
            .put('/update-student-name')
            .send(data)
            .end((err, res) => {
                assert.equal(res.status, '200')
                done()
            })
    })
})