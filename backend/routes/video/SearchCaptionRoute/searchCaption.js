const express = require('express');
const router = express.Router();

const { handleCaptionListRequest } = require("./utils/captionRequestHandler");

router.get('/', async (req, res) => {
    handleCaptionListRequest(req, res);
});


module.exports = router;
