// routes/searchChannel.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const inputType = req.query.channelInputType;
  const inputValue = req.query.channelInputValue;
  const part = "snippet%2CcontentDetails%2Cstatistics"
  const key = "[[KEY]]"

  let id = "";
  let channelAPIurl = "";

  if (inputType == "id") {
    id = inputValue;
    channelAPIurl = `https://youtube.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=${key}`
  } else if (inputType == "name") {
    userName = inputValue;
    channelAPIurl = `https://youtube.googleapis.com/youtube/v3/channels?part=${part}&forUsername=${userName}&key=${key}`
  }

  res.json(channelAPIurl);
});

module.exports = router;

