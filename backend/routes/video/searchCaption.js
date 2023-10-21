const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const videoId = req.query.videoId;
    res.send(videoId);
});


module.exports = router;
