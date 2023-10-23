require('dotenv').config();

const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

// Enable CORS for all routes
app.use(cors());
app.get('/', (req, res) => { res.send('Hello World!') })

// Import and use the searchChannel / searchVideo route handler
const searchChannelRoute = require('./routes/searchChannel');

// Video Routes
const searchVideoRoute = require('./routes/video/SearchVideoRoute/searchVideo');
const searchCaptionRoute = require('./routes/video/SearchCaptionRoute/searchCaption');
const searchCommentThreadsRoute = require('./routes/video/SearchCommentThreadsRoute/searchCommentThreads');
const viewVideoData = require('./routes/viewVideoData');

app.use('/api/searchChannel', searchChannelRoute);
app.use('/api/searchVideo', searchVideoRoute);
app.use('/api/searchCommentThreads', searchCommentThreadsRoute);
app.use('/api/searchCaption', searchCaptionRoute);
app.use('/api/viewVideoData', viewVideoData);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})