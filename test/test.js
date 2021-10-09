const request = require('supertest')
const assert = require('assert')
const app = require("../app");
const controller = require("../controllers/controller");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Contact = mongoose.model("Contact");
const Tag = mongoose.model("Tag");

var server = request.agent('http://localhost:3001')

//LOGGING IN
describe('Logging in', function () {
	async function register() {
		var user = { email: "mochatest@mochatest.com", password: "mochatest", firstName: "test", lastName: "test" }
		await server
			.post("/api/signup")
			.send(user)
			.then(response => {
				console.log(response.body)
			})
	}
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
		it('register', register)
		it('should respond with status 1', function (done) {
			request(app)
				.post('/api/login')
				.send({ email: "mochatest@mochatest.com", password: "mochatest" })
				.then(response => {
					console.log(response.body)
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
		it('should respond with status 0', function (done) {
			request(app)
				.post('/api/login')
				.send({email: "0706167104@test.com", password: "07096661652786167104"})
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
	after(async function() {
		await User.findOneAndDelete({username: "mochatest@mochatest.com"})
	   });
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
	
	context('Logged in', function () {
		it('registerAndLogin', registerAndLogin)
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
	after(async function() {
		await User.findOneAndDelete({username: "mochatest@mochatest.com"})
	   });
})

//SIGN UP
describe('Signing up for an account', function () {
	context('Successfully signing up', function () {
		it('should return status code 1', function (done) {
			server
				.post("/api/signup")
				.send({ email: "mochatest@mochatest.com", password: "mochatest", firstName: "test", lastName: "test" })
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

	context('Missing email', function () {
		it('should return status code 0', function (done) {
			server
				.post("/api/signup")
				.send({ email: "", password: "mochatest", firstName: "test", lastName: "test" })
				.then(response => {
					if (response.body.status == controller.status.UNKNOWN_EMAIL) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
	})

	context('Missing password', function () {
		it('should return status code 0', function (done) {
			server
				.post("/api/signup")
				.send({ email: "mochatest2@mochatest2.com", password: "", firstName: "test", lastName: "test" })
				.then(response => {
					if (response.body.status == controller.status.INVALID_PASSWORD) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
	})

	context('Email in wrong format', function () {
		it('should return status code 0', function (done) {
			server
				.post("/api/signup")
				.send({ email: "mochatest", password: "mochatest", firstName: "test", lastName: "test" })
				.then(response => {
					if (response.body.status == controller.status.UNKNOWN_EMAIL) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
				})
		})
	})

	context('Missing firstName', function () {
		it('should return status code 0', function (done) {
			server
				.post("/api/signup")
				.send({ email: "mochatest@mochatest.com", password: "mochatest", lastName: "test" })
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

	context('Missing lastName', function () {
		it('should return status code 0', function (done) {
			server
				.post("/api/signup")
				.send({ email: "mochatest@mochatest.com", password: "mochatest", firstName: "test" })
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
	after(async function() {
		await User.findOneAndDelete({username: "mochatest@mochatest.com"})
	   });
})


//ADD CONTACT
/**
 * THIS NEEDS TO BE UPDATED ONCE USER-CONTACT ASSOCIATION BRANCH IS MERGED
 */
describe('Adding contacts', function () {
	context('Successfully adding contact', function () {
		it('should return status code 1', function (done) {
			server
				.post('/api/add-contact')
				.send({firstName: "test",
				lastName: "test",
				phone: "test",
				email: "test@test.com",
				category: "test"
				})
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
	
	context('Missing firstName', function () {
		it('should return status code 0', function (done) {
			server
				.post('/api/add-contact')
				.send({
				lastName: "test",
				phone: "test",
				email: "test@test.com",
				category: "test"
				})
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

	context('Missing lastName', function () {
		it('should return status code 0', function (done) {
			server
				.post('/api/add-contact')
				.send({
				firstName: "test",
				phone: "test",
				email: "test@test.com",
				category: "test"
				})
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
	after(async function() {
		await Contact.findOneAndDelete({email: "test@test.com"})
	   });
})

//ADD TAG
describe('Adding tags', function () {
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
	context('Successfully adding tag', function () {
		it('registerAndLogin', registerAndLogin)
		it('should return status code 1', function (done) {
			server
				.post('/api/add-tag')
				.send({username: "mochatest@mochatest.com", tagText: "test"})
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
	
	context('Missing tagText', function () {
		it('registerAndLogin', registerAndLogin)
		it('should return status code 0', function (done) {
			server
				.post('/api/add-contact')
				.send({username: "mochatest@mochatest.com"})
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

	after(async function() {
		await User.findOneAndDelete({username: "mochatest@mochatest.com"})
		await Tag.findOneAndDelete({username: "mochatest@mochatest.com"})
	   });
})

//GET TAGs
describe('Get all user tags', function () {
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
	context('Not logged in', function () {
		it('should return status code 0', function (done) {
			server
			.get('/api/get-tags')
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
	
	context('Successfully getting tags', function () {
		it('registerAndLogin', registerAndLogin)
		it('should return status code 1', function (done) {
			server
				.get('/api/get-tags')
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

	after(async function() {
		await User.findOneAndDelete({username: "mochatest@mochatest.com"})
	   });
})







//DELETE CONTACT
/** 
describe('Delete a contact', function () {
	async function addContact() {
		var contact = {firstName: "test",
		lastName: "test",
		phone: "test",
		email: "test@test.com",
		category: "test"
		}
		await server
			.post("/api/add-contact")
			.send(contact)
			.then(response => {
				console.log(response.body)
			})
	}
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

	context('Successfully deleting a contact', function () {
		it('registerAndLogin', registerAndLogin)
		it('addContact', addContact)
		it('getId')
		it('should return status code 1', function (done) {
			server
				.get('/api/get-contacts')
				.then(response => {
					var id
					contacts = response.body.contacts
					for (var i = 0; i < contacts.length; i++) {
						if (contacts[i].email == "test@test.com") {
							id = contacts[i]._id;
						}
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
	after(async function() {
		await User.findOneAndDelete({email: "mochatest@mochatest.com"})
	   });
})*/
