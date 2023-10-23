const express = require('express');
const router = express.Router();

const { handleCommentThreadsRequest } = require("./utils/commentThreadRequestHandler");

router.get('/', async (req, res) => {
    handleCommentThreadsRequest(req, res);
});


module.exports = router;
