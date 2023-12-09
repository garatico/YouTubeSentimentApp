const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// const db = requre('./models')

// Enable CORS for all routes
app.use(cors());
app.get("/", (req, res) => { res.send("Hello World!"); });

// Import and use the searchChannel / searchVideo route handler
const searchChannelRoute = require("./src/routes/searchChannel");
const searchPlaylistRoute = require("./src/routes/searchPlaylist");

// Video Routes
const searchVideoRoutes = require("./src/routes/searchVideoRoutes");
const viewVideoRoutes = require("./src/routes/viewVideoRoutes");

app.use("/api/searchChannel", searchChannelRoute);
app.use("/api/searchPlaylist", searchPlaylistRoute);
app.use("/api/", searchVideoRoutes);
app.use("/api/viewVideoData", viewVideoRoutes);

app.listen(port, () => { console.log(`Example app listening on port ${port}`); });
