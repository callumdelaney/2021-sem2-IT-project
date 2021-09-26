const request = require('supertest')
const assert = require('assert')
const app = require("../app");
const controller = require("../controllers/controller");

describe('Loggin in', function () {
	context('with an empty request', function () {
		it('should respond with status 0', function (done) {
			request(app)
				.post('/api/login')
				.send({})
				.then(response => {
					if (response.body.status == controller.status.FAILURE) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
	})
})