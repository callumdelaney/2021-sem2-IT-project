const request = require('supertest')
const assert = require('assert')
const app = require("../app");
const controller = require("../controllers/controller");

var server = request.agent('http://localhost:3001')

//LOGGING IN
describe('Logging in', function () {
	context('with an empty request', function () {
		it('should respond with status 0', function (done) {
			request(app)
				.post('/api/login')
				.send({})
				.then(response => {
					if (response.body.status == controller.status.INCORRECT_CREDENTIALS) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
	})

	context('with correct credentials', function () {
		it('should respond with status 1', function (done) {
			request(app)
				.post('/api/login')
				.send({email: "mocha", password: "mocha"})
				.then(response => {
					if (response.body.status == controller.status.SUCCESS) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
	})

	context('with incorrect credentials', function () {
		it('should respond with status 1', function (done) {
			request(app)
				.post('/api/login')
				.send({email: "0706167104", password: "07096661652786167104"})
				.then(response => {
					if (response.body.status == controller.status.INCORRECT_CREDENTIALS) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
	})
})

//GET CONTACTS
describe('Get contacts', function () {
	context('Not logged in', function () {
		it('should return {}', function (done) {
			server
				.get('/api/get-contacts')
				.then(response => {
					if (response.body.stringify == {}.stringify) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
	})

	async function login() {
		await server
			.post("/api/login")
			.send({email: "mocha", password: "mocha"})
			.then(response => {
				console.log(response.body)
			})
	}
	
	context('Logged in', function () {
		it('login', login)
		it('should return status code 1', function (done) {
			server
				.get('/api/get-contacts')
				.then(response => {
					if (response.body.status == controller.status.SUCCESS) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
	})
})