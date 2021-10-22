const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	data: { type: String, required: true },
	contentType: { type: String, required: true },
});

const IMAGE = mongoose.model("Image", imageSchema);

module.exports = IMAGE;
