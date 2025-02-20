const express = require("express");
const app = express();


const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send(`Hello from Express on port ${PORT} `));
app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;