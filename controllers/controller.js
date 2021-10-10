const mongoose = require("mongoose");

const Image = require('../models/image');
const Contact = mongoose.model("Contact");
const User = mongoose.model("User");
const Tag = mongoose.model("Tag");

const passport = require("passport");

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
 * Gets all contacts belonging to the user that is currently logged in.
 * @param {object} req doesn't need anything in the request body
 * @param {object} res responds with a status code and,
 * 						if successful, a list of contacts
 */
const getContacts = async (req, res) => {
	try {
		let contacts = await Contact.find({
			"user_id": req.session.passport.user
		}).lean()
		res.send({
			status: status.SUCCESS,
			contacts: JSON.stringify(contacts)
		});
	} catch (err) {
		res.send({ status: status.FAILURE })
	}
}

/**
 * Gets one specific contact from the database
 * @todo fail if the specified contact does not belong to the logged in user
 * @param {object} req takes a unique contact id
 * @param {object} res responds with a status code and, if successful, a contact
 */
const getOneContact = async (req, res) => {
	try {
		let contact = await Contact.findOne({
			"_id": req.body._id
		}).lean()
		if (contact.user_id == req.session.passport.user) {
			res.send({
				status: status.SUCCESS,
				contacts: contact
			});
		}
		else throw new Error("requested contact does not belong to user");
	} catch (err) {
		return res.send({ status: status.FAILURE })
	}
}

/**
 * Gets all tags from the database belonging to a specific user
 * @param {object} req takes a unique user id
 * @param {object} res responds with a status code and, if successful, a list of tags
 */
const getTags = async (req, res) => {
	try {
		let tags = await Tag.find({
			// searching for all tags linked to one user_id
			user_id: req.session.passport.user
		}).lean()
		// if tag wass found, send success and log tag
		res.send({
			status: status.SUCCESS,
			tags: tags
		});
	} catch (err) {
		return res.send({ status: status.FAILURE })
	}
}

/**
 * Gets one specific tag from the database
 * @param {object} req takes a unique tag id
 * @param {object} res responds with a status code and, if successful, a tag
 */
const getOneTag = async (req, res) => {
	try {
		// try to find it
		let tag = await Tag.findOne({
			_id: req.body._id
		}).lean()

		// send it if found, and report success
		res.send({
			status: status.SUCCESS,
			tag: tag
		});
	} catch (err) {
		return res.send({ status: status.FAILURE })
	}
}

/******************* incoming (frontend -> backend) ***************************/

/**
 * Adds a new contact to the database
 * @param {object} req takes contact information
 * 		(see ../models/contact/contactSchema)
 * @param {object} res responds with a status code
 */
const addNewContact = async (req, res) => {
	try {
		const newContact = await Contact.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phoneNumber,
			email: req.body.email,
			category: req.body.category,
			photo: req.body.photo,
			notes: req.body.notes,
			user_id: req.session.passport.user,
		})
		new Contact(newContact).save()
		res.send({ status: status.SUCCESS })
	} catch (err) {
		res.send({ status: status.FAILURE })
	}
}

/**
 * Edits an existing contact in the database
 * @param {object} req takes contact information
 * 		(see ../models/contact/contactSchema)
 * @param {object} res responds with a status code
 */
const editContact = async (res, req) => {
	try {
		await Contact.findOneAndUpdate({
			_id: req.body._id,
			user_id: req.session.passport.user,
		}, {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone,
			email: req.body.email,
			category: req.body.category
		})
		res.send({ status: status.SUCCESS })
	} catch (err) {
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
			"_id": req.body._id,
			"user_id": req.session.passport.user,
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
			"_id": req.body._id,
			"user_id": req.session.passport.user,
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
	// hashing password
	var pass;
	try {
		pass = passportFunc.genPassword(req.body.password)
	} catch (err) {
		res.send({ status: status.INVALID_PASSWORD })
	}

	try {
		// validating email
		const regex = /\S+@\S+\.\S+/;
		if (regex.test(String(req.body.username).toLowerCase()) == false) {
			return res.send({status: status.INVALID_EMAIL})
		}
		const newUser = await User.create({
			username: req.body.username,
			hash: pass.hash,
			salt: pass.salt,
			firstName: req.body.firstName,
			lastName: req.body.lastName
		})
		res.send({ status: status.SUCCESS })
		new User(newUser).save();

	} catch (err) {
		res.send({ status: status.FAILURE, error: err })
	}
}

const changePassword = async (req, res) => {
	var newPass = passportFunc.genPassword(req.body.newPassword)
	var oldPass = req.body.oldPassword

	try {
		const user = await User.findOne({
			"username": req.user.username
		})
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
		await User.findOneAndUpdate({
			user_id: req.session.passport.user
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

	/* This was a work-around:
	User schemas had 'email' but Passport needs req to have 'username'
	var data = {
		username: req.body.email,
		password: req.body.password
	}
	req.body = data;
	*/

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
		const newTag = await Tag.create({
			user_id: req.session.passport.user,
			tagText: req.body.tagText,
			tagColour: req.body.tagColour,
		})
		new Tag(newTag).save()
		res.send({ status: status.SUCCESS })
	} catch (err) {
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

const uploadImage = async (req, res) => {
	var obj = {
		data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png' 
	}
	await Image.create(obj, (err, item) => {
		if (err) {
			res.send({status: status.FAILURE})
		} else {
			res.send({status: status.SUCCESS, image: obj})
		}
	})
}

const changeProfilePic = async (req, res) => {
	try {
		await User.findOneAndUpdate({
			"username": req.user.username
		}, {
			photo: req.body.image
		})
		res.send({status: status.SUCCESS, image: req.body.image})
	} catch (err) {
		res.send({status: status.FAILURE})
	}
}

const getImage = async (req, res) => {
	await Image.findOne({"_id": req.body._id}, (err, item) => {
		if (err) {
			res.send({status: status.FAILURE})
		} else {
			res.send({
				image: item,
				status: status.SUCCESS
			})
		}
	})
}

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
	getOneTag,
	addNewTag,
	editTag,
	deleteTag,
	changePassword,
	changeFirstName,
	changeLastName,
	changeEmail,
	uploadImage,
	getImage,
	changeProfilePic
};