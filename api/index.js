const express = require("express");
const app = express();

// app.use(express.static("api"))
// app.use(express.static("/api"))
// app.use(express.static("api/dist"))
// app.use(express.static("/api/dist"))
// app.use(express.static("/dist"))
// app.use(express.static("dist"))
// app.use(express.static("/"))

const path = require("path")
app.use(express.static(path.join(__dirname, 'dist')));

app.get("/", (req, res) => res.send(`Hello from Express on port ${PORT} `));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server ready on port", PORT));

module.exports = app;