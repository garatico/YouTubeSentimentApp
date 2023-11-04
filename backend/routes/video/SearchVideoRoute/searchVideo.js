const express = require("express");
const router = express.Router();

const { videoHandleRoute } = require("./utils/videoHandleRoute")

router.get("/", async (req, res) => {
  videoHandleRoute(req, res);
});


module.exports = router;
