const request = require('supertest')
const assert = require('assert')
const app = require("../app");

describe('login()', function () {
    context('Empty request:', function () {
        it('should respond with status: 0', function () {
            request(app)
                    .post('/api/login')
                    .then(response => {
                        done();
                    })
        })
    })
})

