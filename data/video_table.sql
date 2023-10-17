DROP TABLE IF EXISTS videos;

CREATE TABLE videos (
	video_id TEXT PRIMARY KEY,
	
	-- Within Snippet
	publishedAt TIMESTAMP,
	channelId text,
    channelTitle text,
    title text,
    description text,
	tags text[],
	
	-- Within Content Details
	duration text,
    dimension text,
    definition text,
	caption boolean,
    licensedContent boolean,
	projection TEXT
	
	-- Within Statistics
	viewCount integer,
    likeCount integer,
    favoriteCount integer,
    commentCount integer,

    -- Topic Details
	topicCategories text[],
	
);


