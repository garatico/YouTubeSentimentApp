DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
	comment_id TEXT PRIMARY KEY,
	
	-- Within Snippet
	channelId TEXT,
    videoId TEXT,
    canReply BOOLEAN,
    totalReplyCount INTEGER,
    isPublic BOOLEAN,
    -- Within TLC Snippet
    textDisplay TEXT,
    textOriginal TEXT,
    authorDisplayName TEXT,
    authorChannelId TEXT, 
    canRate BOOLEAN,
    viewerRating TEXT,
    likeCount INTEGER,
    publishedAt TIMESTAMP,
    updatedAt TIMESTAMP,
    parentId TEXT
);


