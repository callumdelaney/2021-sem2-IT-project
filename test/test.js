const request = require('supertest')
const app = require("../app"); // this is needed to register all the schemas
const controller = require("../controllers/controller");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Contact = mongoose.model('Contact');
const Tag = mongoose.model('Tag');
const data = require('./data')

var server;

describe('Duckroll', function () {
	before(async function() {
		server = await request.agent('http://localhost:3001')
	})
	context('Not logged in', function () {
		describe('Getting contacts', function () {
			it('should respond with status FAILURE', function (done) {
				server.get('/api/get-contacts')
					.then(response => {
						if (response && response.body &&
							response.body.status == controller.status.FAILURE) {
							done()
						}
						else {
							done(new Error(JSON.stringify(response.body)))
						}
					})
			})
		})
		describe('Getting tags', function () {
			it('should respond with status FAILURE', function (done) {
				server.get('/api/get-tags')
					.then(response => {
						if (response && response.body &&
							response.body.status == controller.status.FAILURE) {
							done()
						}
						else {
							done(new Error(JSON.stringify(response.body)))
						}
					})
			})
		})
		describe('Signing up', function () {
			context('Missing email', function () {
				it('should respond with status INVALID_EMAIL', function (done) {
					server.post('/api/signup')
						.send({
							username: '',
							password: data.user.password,
							firstName: data.user.firstName,
							lastName: data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.INVALID_EMAIL) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
			context('Missing password', function () {
				it('should respond with status INVALID_PASSWORD', function (done) {
					server.post('/api/signup')
						.send({
							username: data.user.username,
							password: '',
							firstName: data.user.firstName,
							lastName: data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.INVALID_PASSWORD) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
			context('Email in wrong format', function () {
				it('should respond with status INVALID_EMAIL', function (done) {
					server.post('/api/signup')
						.send({
							username: data.user.firstName,
							password: data.user.password,
							firstName: data.user.firstName,
							lastName: data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.INVALID_EMAIL) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
			context('Missing firstName', function () {
				it('should respond with status FAILURE', function (done) {
					server.post('/api/signup')
						.send({
							username: data.user.username,
							password: data.user.password,
							firstName: '',
							lastName: data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.FAILURE) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
			context('Missing lastName', function () {
				it('should respond with status FAILURE', function (done) {
					server.post('/api/signup')
						.send({
							username: data.user.username,
							password: data.user.password,
							firstName: data.user.firstName,
							lastName: '',
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.FAILURE) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
			context('With valid information', function () {
				it('should responde with status SUCCESS', function(done) {
					server.post('/api/signup')
						.send({
							username: data.user.username,
							password: data.user.password,
							firstName: data.user.firstName,
							lastName: data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.SUCCESS) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
		})
		describe('Logging in', function () {
			/* for now, passport handles empty requests for us
			context('with an empty request', function () {
				it('should respond with status FAILURE', function (done) {
					server.post('/api/login')
						//.send({})
						.then(response => testStatus(done, response,
							controller.status.FAILURE))
				})
			})
			*/
			context('with incorrect credentials', function () {
				it('should respond with status INCORRECT_CREDENTIALS', function (done) {
					server.post('/api/login')
						.send({
							email: 'impossible_username_noone_will_ever_have@test.com',
							password: '3.14159265358979323846264338327950288419716939',
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.INCORRECT_CREDENTIALS) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
			context('with correct credentials', function () {
				it('should respond with status SUCCESS', function (done) {
					server.post('/api/login')
						.send({
							username: data.user.username,
							password: data.user.password,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.SUCCESS) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
		})
	})
	context("Logged in", function () {
		describe('Getting contacts', function () {
			it('should respond with status SUCCESS and a list of contacts', function (done) {
				server
					.get('/api/get-contacts')
					.then(response => {
						if (response && response.body &&
							response.body.status == controller.status.SUCCESS) {
							// TODO: compare response.body.contacts to contacts in the test data
							done()
						}
						else {
							done(new Error(JSON.stringify(response.body)))
						}
					})
			})
		})
		describe('Adding contacts', function () {
			context('Missing firstName', function () {
				it('should respond with status FAILURE', function (done) {
					server.post('/api/add-contact')
						.send({
							firstName: '',
							lastName: data.contacts[0].lastName,
							phone: data.contacts[0].phone,
							email: data.contacts[0].email,
							category: data.contacts[0].category,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.FAILURE) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
			context('Missing lastName', function () {
				it('should respond with status FAILURE', function (done) {
					server.post('/api/add-contact')
						.send({
							firstName: data.contacts[0].firstName,
							lastName: '',
							phone: data.contacts[0].phone,
							email: data.contacts[0].email,
							category: data.contacts[0].category,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.FAILURE) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
			context('With valid information', function () {
				it('should respond with status SUCCESS', function (done) {
					server.post('/api/add-contact')
						.send({
							firstName: data.contacts[0].firstName,
							lastName: data.contacts[0].lastName,
							phone: data.contacts[0].phone,
							email: data.contacts[0].email,
							category: data.contacts[0].category,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.SUCCESS) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
		})
		describe('Making new tags', function () {
			context('Missing tagText', function () {
				it('should respond with status FAILURE', function (done) {
					server.post('/api/add-tag')
						.send({
							tagText: '',
							tagColour: data.tags[0].tagColour,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.FAILURE) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
			context('With valid information', function () {
				it('should respond with status SUCCESS', function (done) {
					server.post('/api/add-tag')
						.send({
							tagText: data.tags[0].tagText,
							tagColour: data.tags[0].tagColour,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == controller.status.SUCCESS) {
								done()
							}
							else {
								done(new Error(JSON.stringify(response.body)))
							}
						})
				})
			})
		})
		describe('Getting user tags', function () {
			it('should return status SUCCESS', function (done) {
				server.get('/api/get-tags')
					.then(response => {
						if (response && response.body &&
							response.body.status == controller.status.SUCCESS) {
							done()
						}
						else {
							done(new Error(JSON.stringify(response.body)))
						}
					})
			})
		})
	})
	// TODO: proper log-out and delete user functionality
	after(async function() {
		await User.findOneAndDelete({username: 'pekin_duck@duckpond.com'})
	})
})

//DELETE CONTACT
/** 
describe('Delete a contact', function () {
	async function addContact() {
		var contact = {firstName: 'test',
		lastName: 'test',
		phone: 'test',
		email: 'test@test.com',
		category: 'test'
		}
		await server
			.post('/api/add-contact')
			.send(contact)
			.then(response => {
				console.log(response.body)
			})
	}
	async function registerAndLogin() {
		var user = { email: 'mochatest@mochatest.com', password: 'mochatest', firstName: 'test', lastName: 'test' }
		await server
			.post('/api/signup')
			.send(user)
			.then(response => {
				console.log(response.body)
			})
		await server
			.post('/api/login')
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
						if (contacts[i].email == 'test@test.com') {
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
	after(async function() {
		await User.findOneAndDelete({email: 'mochatest@mochatest.com'})
	   });
})*/
