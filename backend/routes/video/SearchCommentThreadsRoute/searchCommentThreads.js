const express = require('express');
const router = express.Router();

const { commentThreadHandleRoute } = require("./utils/commentThreadHandleRoute");

router.get('/', async (req, res) => {
    commentThreadHandleRoute(req, res);
});


module.exports = router;
