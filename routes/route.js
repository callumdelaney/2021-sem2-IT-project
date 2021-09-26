const express = require("express");

const router = express.Router();

const controller = require("../controllers/controller");

router.get("/", async (req, res) => {
  res.redirect("/login");
});

router.get("/login", controller.login);
router.get("/contacts", controller.getContacts);
router.get("/contacts/:contact", controller.getOneContact);

module.exports = router;
