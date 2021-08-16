const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

require('./models/db.js')

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
