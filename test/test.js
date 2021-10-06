const request = require('supertest')
const assert = require('assert')
const app = require("../app");
const controller = require("../controllers/controller");
const { userInfo } = require('os');
const mongoose = require("mongoose");
const User = mongoose.model("User");

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
				.send({ email: "test", password: "test" })
				.then(response => {
					if (!response.body) {
						done(new Error("empty response body"))
					}
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
				.send({ email: "0706167104", password: "07096661652786167104" })
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
			.send({ email: "test", password: "test" })
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

//CHANGING PASSWORD
describe('Change Password', function () {
	async function registerAndLogin() {
		var user = { email: "mochatest@mochatest.com", password: "mochatest", firstName: "test", lastName: "test" }
		await server
			.post("/api/signup")
			.send(user)
			.then(response => {
				console.log(response.body)
			})
		await server
			.post("/api/login")
			.send({email: user.email, password: user.password})
			.then(response => {
				console.log(response.body)
			})
	}

	context('Successfully changing', function () {
		it('registerAndLogin', registerAndLogin)
		it('should return status code 1', function (done) {
			server
				.post("/api/update-user-password")
				.send({oldPassword: "mochatest", newPassword: "mochatest2"})
				.then(response => {
					if (response.body.status == controller.status.SUCCESS) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
		after(async function() {
			await User.findOneAndDelete({username: "mochatest@mochatest.com"})
		   });
	})
})

//CHANGE FIRST NAME
describe('Change First Name', function () {
	async function registerAndLogin() {
		var user = { email: "mochatest@mochatest.com", password: "mochatest", firstName: "test", lastName: "test" }
		await server
			.post("/api/signup")
			.send(user)
			.then(response => {
				console.log(response.body)
			})
		await server
			.post("/api/login")
			.send({email: user.email, password: user.password})
			.then(response => {
				console.log(response.body)
			})
	}

	context('Successfully changing', function () {
		it('registerAndLogin', registerAndLogin)
		it('should return status code 1', function (done) {
			server
				.post("/api/update-firstName")
				.send({firstName: "Greg"})
				.then(response => {
					if (response.body.status == controller.status.SUCCESS) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
		after(async function() {
			await User.findOneAndDelete({username: "mochatest@mochatest.com"})
		   });
	})
})

//CHANGE LAST NAME
describe('Change Last Name', function () {
	async function registerAndLogin() {
		var user = { email: "mochatest@mochatest.com", password: "mochatest", firstName: "test", lastName: "test" }
		await server
			.post("/api/signup")
			.send(user)
			.then(response => {
				console.log(response.body)
			})
		await server
			.post("/api/login")
			.send({email: user.email, password: user.password})
			.then(response => {
				console.log(response.body)
			})
	}

	context('Successfully changing', function () {
		it('registerAndLogin', registerAndLogin)
		it('should return status code 1', function (done) {
			server
				.post("/api/update-lastName")
				.send({lastName: "Gregson"})
				.then(response => {
					if (response.body.status == controller.status.SUCCESS) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
		after(async function() {
			await User.findOneAndDelete({username: "mochatest@mochatest.com"})
		   });
	})
})