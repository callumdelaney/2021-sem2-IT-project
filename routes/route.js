const express = require('express')

const router = express.Router()

const controller = require("../controllers/controller.js")

router.get('/', async (req, res) => {
    res.redirect('/login')
})

router.get('/login', controller.getLogin);
router.get('/contacts', controller.getContacts);
router.get('/contacts/:contact', controller.getOneContact);


module.exports = router;