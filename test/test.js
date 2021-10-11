// this generates proper http requests for our tests
const Server = require('supertest').agent('http://localhost:3001')

// this connects to the Database and register all the schemas
require("../App")

// this lets us delete the test user. TODO: make a proper deleteUser function
const User = require("mongoose").model("User");

// this has all the test data
const Data = require('./data')

const Status = require('../controllers/controller').status

before(async function() {
	// wait for the database connection
	await new Promise(resolve => setTimeout(resolve, 1000))
})
describe('Duckroll', function () {
	
	context('Not logged in', function () {
		describe('Getting contacts', function () {
			it('should respond with status FAILURE', function (done) {
				Server.get('/api/get-contacts')
					.then(response => {
						if (response && response.body &&
							response.body.status == Status.FAILURE) {
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
				Server.get('/api/get-tags')
					.then(response => {
						if (response && response.body &&
							response.body.status == Status.FAILURE) {
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
					Server.post('/api/signup')
						.send({
							username: '',
							password: Data.user.password,
							firstName: Data.user.firstName,
							lastName: Data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.INVALID_EMAIL) {
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
					Server.post('/api/signup')
						.send({
							username: Data.user.username,
							password: '',
							firstName: Data.user.firstName,
							lastName: Data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.INVALID_PASSWORD) {
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
					Server.post('/api/signup')
						.send({
							username: Data.user.firstName,
							password: Data.user.password,
							firstName: Data.user.firstName,
							lastName: Data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.INVALID_EMAIL) {
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
					Server.post('/api/signup')
						.send({
							username: Data.user.username,
							password: Data.user.password,
							firstName: '',
							lastName: Data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.FAILURE) {
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
					Server.post('/api/signup')
						.send({
							username: Data.user.username,
							password: Data.user.password,
							firstName: Data.user.firstName,
							lastName: '',
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.FAILURE) {
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
					Server.post('/api/signup')
						.send({
							username: Data.user.username,
							password: Data.user.password,
							firstName: Data.user.firstName,
							lastName: Data.user.lastName,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.SUCCESS) {
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
					Server.post('/api/login')
						//.send({})
						.then(response => testStatus(done, response,
							Status.FAILURE))
				})
			})
			*/
			context('with incorrect credentials', function () {
				it('should respond with status INCORRECT_CREDENTIALS', function (done) {
					Server.post('/api/login')
						.send({
							email: 'impossible_username_noone_will_ever_have@test.com',
							password: '3.14159265358979323846264338327950288419716939',
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.INCORRECT_CREDENTIALS) {
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
					Server.post('/api/login')
						.send({
							username: Data.user.username,
							password: Data.user.password,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.SUCCESS) {
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
				Server
					.get('/api/get-contacts')
					.then(response => {
						if (response && response.body &&
							response.body.status == Status.SUCCESS) {
							// TODO: compare response.body.contacts to contacts in the test Data
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
					Server.post('/api/add-contact')
						.send({
							firstName: '',
							lastName: Data.contacts[0].lastName,
							phone: Data.contacts[0].phone,
							email: Data.contacts[0].email,
							category: Data.contacts[0].category,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.FAILURE) {
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
					Server.post('/api/add-contact')
						.send({
							firstName: Data.contacts[0].firstName,
							lastName: '',
							phone: Data.contacts[0].phone,
							email: Data.contacts[0].email,
							category: Data.contacts[0].category,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.FAILURE) {
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
					Server.post('/api/add-contact')
						.send({
							firstName: Data.contacts[0].firstName,
							lastName: Data.contacts[0].lastName,
							phone: Data.contacts[0].phone,
							email: Data.contacts[0].email,
							category: Data.contacts[0].category,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.SUCCESS) {
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
					Server.post('/api/add-tag')
						.send({
							tagText: '',
							tagColour: Data.tags[0].tagColour,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.FAILURE) {
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
					Server.post('/api/add-tag')
						.send({
							tagText: Data.tags[0].tagText,
							tagColour: Data.tags[0].tagColour,
						})
						.then(response => {
							if (response && response.body &&
								response.body.status == Status.SUCCESS) {
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
				Server.get('/api/get-tags')
					.then(response => {
						if (response && response.body &&
							response.body.status == Status.SUCCESS) {
							done()
						}
						else {
							done(new Error(JSON.stringify(response.body)))
						}
					})
			})
		})
		describe('Deleting a contact', function () {
			it('should respond with status SUCCESS', function (done) {
				// first we need to get the _id of a contact
				Server.get('/api/get-contacts')
				.then(response => {
				if (
				response && response.body &&
				response.body.status == Status.SUCCESS &&
				response.body.contacts &&
				response.body.contacts[0] &&
				response.body.contacts[0]._id
				) {
					// now we can delete that contact
					Server.post('/api/delete-contact')
					.send({_id: response.body.contacts[0]._id})
					.then(response => {
					if (response && response.body &&
						response.body.status == Status.SUCCESS) {
						done()
					}
					else {
						done(new Error(JSON.stringify(response.body)))
					}
					}) // deleteContact call ends here
				} else {
					done(new Error(JSON.stringify(response.body)))
				}
				}) // getContacts call ends here
			})
		})
		describe('Changing Password', function () {
			context('With valid information', function () {
				it('should respond with status SUCCESS', function (done) {
					Server.post("/api/update-user-password")
					.send({
						oldPassword: Data.user.password,
						newPassword: Data.changedUser.password,
					})
					.then(response => {
						if (response.body.status == Status.SUCCESS) {
							done()
						}
						else {
							done(new Error(JSON.stringify(response.body)))
						}
					})
				})
			})
		})
		describe('Changing First Name', function () {
			context('With valid information', function () {
				it('should respond with status SUCCESS', function (done) {
					Server.post("/api/update-firstName")
					.send({firstName: Data.changedUser.firstName})
					.then(response => {
						if (response.body.status == Status.SUCCESS) {
							done()
						}
						else {
							done(new Error(JSON.stringify(response.body)))
						}
					})
				})
			})
		})
		describe('Changing Last Name', function () {
			context('With valid information', function () {
				it('should respond with status SUCCESS', function (done) {
					Server.post("/api/update-lastName")
					.send({lastName: Data.changedUser.lastName})
					.then(response => {
						if (response.body.status == Status.SUCCESS) {
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
	// TODO: proper log-out and delete user functionality
	after(async function() {
		await User.findOneAndDelete({username: 'pekin_duck@duckpond.com'})
	})
})
