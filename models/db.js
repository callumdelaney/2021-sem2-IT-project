require('dotenv').config()


const mongoose = require("mongoose");
let connectionURL = "mongodb://localhost";


if ("PORT" in process.env) {
  connectionURL =
    "mongodb+srv://duckroll:duckroll@cluster0.uxvwm.mongodb.net/duckroll?retryWrites=true&w=majority";
} else {
  connectionURL = "mongodb+srv://duckroll:duckroll@cluster0.uxvwm.mongodb.net/duckroll?retryWrites=true&w=majority";
}

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "duckroll",
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connection to MongoDB on " + db.host + ":" + db.Port);
  console.log("Success")
});

require("./contact");
require("./user");
require("./tag");

