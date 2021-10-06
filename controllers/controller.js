const mongoose = require("mongoose");

//const Image = mongoose.model("Image");
const Contact = mongoose.model("Contact");
const User = mongoose.model("User");
const Tag = mongoose.model("Tag");



const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const passportFunc = require('../passport');


// ENUM for status codes (refer to API documentation)
const status = {
	FAILURE: 0,
	SUCCESS: 1,
	UNKNOWN_EMAIL: 11,
	INCORRECT_CREDENTIALS: 12,
	EMAIL_TAKEN: 13,
	INVALID_PASSWORD: 14,
	INVALID_EMAIL: 15
}


/******************* outgoing (backend -> frontend) ***************************/


/**
 * Gets all existing contacts in the database
 * @todo only return contacts of the user that is currently logged in
 * @param {object} req doesn't need anything in the request body
 * @param {object} res responds with a status code and, if successful, a list of contacts
 * @returns 
 */
const getContacts = async (req, res) => {
	try {
		let contacts = await Contact.find({}).lean()
		res.send({
			status: status.SUCCESS,
			contacts: JSON.stringify(contacts)
		});
		console.log(contacts)
	} catch (err) {
		console.log(err)
		return res.send({ status: status.FAILURE })
	}
}

/**
 * Gets one specific contact from the database
 * @todo fail if the specified contact does not belong to the logged in user
 * @param {object} req takes a unique contact id
 * @param {object} res responds with a status code and, if successful, a contact
 * @returns 
 */
const getOneContact = async (req, res) => {
	try {
		let contact = await Contact.findOne({
			"_id": req.body._id
		}).lean()
		res.send({
			status: status.SUCCESS,
			contacts: JSON.stringify(contact)
		});
		console.log(contact)
	} catch (err) {
		console.log(err)
		return res.send({ status: status.FAILURE })
	}
}


/**
 * Gets all existing tags from the database
 * @param {object} req doesn't need anything in the request body
 * @param {object} res responds with a status code and, if successful, a list of tags
 * @returns 
 */
const getTags = async (req, res) => {
	try {
		console.log("getting tags");
		let tags = await Tag.find({}).lean()

		res.send({
			tags: JSON.stringify(tags),
			message: "tag got",
			status: status.SUCCESS
		});

		console.log(tags)


	} catch (err) {
		console.log("tags get fail");
		console.log(err)
		return res.send({ status: status.FAILURE })

	}
}

/**
 * Gets all tags from the database belonging to a specific user
 * @param {object} req takes a unique user id
 * @param {object} res responds with a status code and, if successful, a list of tags
 * @returns 
 */
const getUserTags = async (req, res) => {
	try {
		let tags = await Tag.find({
			// searching for all tags linked to one userId
			'userId': req.body.userId

		}).lean()

		// if tag wass found, send success and log tag
		res.send({
			status: status.SUCCESS,
			tags: JSON.stringify(tags)
		});

		console.log(tags)

	} catch (err) {
		console.log(err)
		return res.send({ status: status.FAILURE })
	}
}

/**
 * Gets one specific tag from the database
 * @param {object} req takes a unique tag id
 * @param {object} res responds with a status code and, if successful, a tag
 * @returns 
 */
const getOneTag = async (req, res) => {
	try {
		// try to find it
		let tag = await Tag.findOne({
			"_id": req.body._id

		}).lean()

		// send it if found, and report success
		res.send({
			status: status.SUCCESS,
			tags: JSON.stringify(tag)
		});
		console.log(tag)

	} catch (err) {
		console.log(err)
		return res.send({ status: status.FAILURE })
	}
}

/******************* incoming (frontend -> backend) ***************************/

/**
 * Adds a new contact to the database
 * @param {object} req takes contact information (see ../models/contact/contactSchema)
 * @param {object} res responds with a status code
 */
const addNewContact = async (req, res) => {
	try {
		const newContact = await Contact.create({
			"firstName": req.body.firstName,
			"lastName": req.body.lastName,
			"phone": req.body.phoneNumber,
			"email": req.body.email,
			"category": req.body.category,
			"photo": req.body.photo,
			"notes": req.body.notes,
			"userId": req.user.username
		})
		res.send({ status: status.SUCCESS })
		new Contact(newContact).save()
	} catch (err) {
		console.log(err)
		res.send({ status: status.FAILURE })
	}
}

/**
 * Edits an existing contact in the database
 * @param {object} req takes contact information (see ../models/contact/contactSchema)
 * @param {object} res responds with a status code
 */
const editContact = async (res, req) => {
	try {
		await Contact.findOneAndUpdate({
			"_id": req.body._id
		}, {
			"firstName": req.body.firstName,
			"lastName": req.body.lastName,
			"phone": req.body.phone,
			"email": req.body.email,
			"category": req.body.category
		})
		res.send({ status: status.SUCCESS })
	} catch (err) {
		console.log(err)
		res.send({ status: status.FAILURE })
	}
}

/**
 * Deletes an existing contact from the database
 * @param {object} req takes the unique ID of a contact
 * @param {object} res responds with a status code
 */
const deleteContact = async (req, res) => {
	try {
		await Contact.findOneAndDelete({
			"_id": req.body._id
		})
		res.send({ status: status.SUCCESS })
	} catch (err) {
		res.send({ status: status.FAILURE })
	}
}

/**
 * Adds a note to an existing contact in the database
 * @deprecated since we switched to one note per contact
 * @param {object} req takes a string
 * @param {object} res responds with a status code
 */
const addNote = async (req, res) => {
	let newNote = req.body.note
	try {
		var contact = await Contact.findOne({ "_id": req.body._id })
		contact.notes.push(newNote)
		contact.save
		res.send({ status: status.SUCCESS })
	} catch (err) {
		res.send({ status: status.FAILURE })
	}
	console.log(newNote)
}

/**
 * Changes the category of an existing contact
 * @deprecated since we have an editContact function
 * @param {object} req takes a contact ID and a new category
 * @param {object} res responds with a status code
 */
const changeCategory = async (req, res) => {
	try {


		await Contact.findOneAndUpdate({
			"_id": req.body._id
		}, {
			"category": req.body.category
		})
		res.send({ status: status.SUCCESS })
	} catch (err) {
		res.send({ status: status.FAILURE })
	}
}

/**
 * Adds a new user to the database
 * @param {object} req takes user information (see ../models/user/userSchema)
 * @param {object} res responds with a status code
 */
const newUser = async (req, res) => {
	var pass = passportFunc.genPassword(req.body.password)

	const regex = /\S+@\S+\.\S+/;
    if (regex.test(String(req.body.email).toLowerCase()) == false) {
		return res.send({status: status.UNKNOWN_EMAIL})
	}
	try {
		const newUser = await User.create({
			username: req.body.email,
			hash: pass.hash,
			salt: pass.salt,
			firstName: req.body.firstName,
			lastName: req.body.lastName
		})
		res.send({ status: status.SUCCESS })
		new User(newUser).save();

	} catch (err) {
		res.send({ status: status.FAILURE, error: err })
		console.log(err)
	}
}

const changePassword = async (req, res) => {
	var newPass = passportFunc.genPassword(req.body.newPassword)
	var oldPass = req.body.oldPassword

	try {
		const user = await User.findOne({
			"username": req.user.username
		})
		console.log(user)

		if (passportFunc.checkPassword(oldPass, user.hash, user.salt) == false) {
			res.send({ status: status.FAILURE })
		}  else {
			user.set({
				hash: newPass.hash,
				salt: newPass.salt
			})
			await user.save()
			res.send({ status: status.SUCCESS })
		}
	} catch (err) {
		res.send({ status: status.FAILURE })
	}
}

const changeFirstName = async (req, res) => {
	try {
		await User.findOneAndUpdate({
			"username": req.user.username
		}, {
			firstName: req.body.firstName
		})
		res.send({status: status.SUCCESS})
	} catch (err) {
		res.send({status: status.FAILURE})
	}
}

const changeLastName = async (req, res) => {
	try {
		await User.findOneAndUpdate({
			"username": req.user.username
		}, {
			lastName: req.body.lastName
		})
		res.send({status: status.SUCCESS})
	} catch (err) {
		res.send({status: status.FAILURE})
	}
}


const changeEmail = async (req, res) => {
	try {
		//_id is used since it seems emails are usernames
		await User.findOneAndUpdate({
			"_id": req.user._id
		}, {
			username: req.body.username
		})
		res.send({status: status.SUCCESS})
	} catch (err) {
		res.send({status: status.FAILURE})
	}
}


/**
 * Authenticates login details and, if valid, logs the user in
 * (i.e. starts a session)
 * @param req expects an email and a password
 * @param res responds with a status code
 */
const login = async (req, res, next) => {

	/* This is a work-around:
	User schemas have 'email' but Passport needs req to have 'username' */
	var data = {
		username: req.body.email,
		password: req.body.password
	}
	req.body = data;

	passport.authenticate('local', (err, user, info) => {
		if (err) {
			res.send({ status: status.FAILURE, error: err })
			return next(err);
		} else if (!user) {
			res.send({ status: status.INCORRECT_CREDENTIALS })
		} else {
			req.logIn(user, function (err) {
				res.send({ status: status.SUCCESS })
			})
		}

	})(req, res, next);
}

/**
 * Adds a new tag to the database
 * @param {object} req takes tag information (see ../models/tag/tagSchema)
 * @param {object} res responds with a status code
 */
const addNewTag = async (req, res) => {
	try {
		// Generate random hex colour from
		// https://css-tricks.com/snippets/javascript/random-hex-color/
		var randomColour = Math.floor(Math.random() * 16777215).toString(16);

		const newTag = await Tag.create({
			"userId": req.body.userId,
			"tagText": req.body.tagText,
			// "tagColour" : req.body.tagColour
			// random generate tag's hex colour instead
			"tagColour": randomColour
		})

		new Tag(newTag).save()
		console.log(newTag)
		res.send({ status: status.SUCCESS })

	} catch (err) {
		console.log(err)
		res.send({ status: status.FAILURE })
	}
}

/**
 * Edits an existing tag in the database
 * @param {object} req takes a unique tag id
 * @param {object} res responds with a status code
 */
const editTag = async (req, res) => {
	try {
		await Tag.findOneAndUpdate({
			"_id": req.body._id,
		}, {
			"tagText": req.body.tagText,
			"tagColour": req.body.tagColour
		})
		res.send({ status: status.SUCCESS })

	} catch (err) {
		console.log(err)
		res.send({ status: status.FAILURE })
	}
}

/**
 * Deletes an existing tag from the database
 * @param {object} req takes a unique tag id
 * @param {object} res responds with a status code
 */
const deleteTag = async (req, res) => {
	try {
		await Tag.findOneAndDelete({
			"_id": req.body._id
		})

		res.send({ status: status.SUCCESS })
	} catch (err) {
		res.send({ status: status.FAILURE })
	}
}
//IMAGE STUFF NOT DONE YET

/**const uploadImage = async (req, res) => {
	var obj = {
		data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png' 
	}
	await Image.create(obj, (err, item) => {
		if (err) {
			console.log(err)
			res.send({status: status.FAILURE})
		} else {
			res.send({status: status.SUCCESS})
		}
	})
}

const getImage = async (req, res) => {
	await Image.findOne({"_id": req.body._id}, (err, item) => {
		if (err) {
			console.log(err)
			res.send({status: status.FAILURE})
		} else {
			res.send({
				image: item,
				status: status.SUCCESS
			})
		}
	})
}*/

module.exports = {
	status,
	login,
	getContacts,
	getOneContact,
	addNewContact,
	editContact,
	deleteContact,
	addNote,
	changeCategory,
	newUser,
	getTags,
	getUserTags,
	getOneTag,
	addNewTag,
	editTag,
	deleteTag,
	changePassword,
	changeFirstName,
	changeLastName,
	changeEmail,
	//uploadImage,
	//getImage
};