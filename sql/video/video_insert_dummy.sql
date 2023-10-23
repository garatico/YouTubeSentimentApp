-- Insert a dummy video record
INSERT INTO videos (
    video_id, 
	publishedAt, 
	channelId, 
	channelTitle, 
	title, 
	description, 
	tags, 
	duration, 
	dimension, 
	definition, 
	caption, 
	licensedContent, 
	projection, 
	viewCount, 
	likeCount, 
	favoriteCount, 
	commentCount, 
	topicCategories
)
VALUES (
    'abcdefgh123', -- Video ID
    '2023-10-12 14:30:00', -- Published Date and Time
    'channel123', -- Channel ID
    'My Channel', -- Channel Title
    'Sample Video Title', -- Video Title
    'This is a sample video description.', -- Video Description
    '{"tag1", "tag2", "tag3"}', -- Tags as an array
    '01:23:45', -- Duration
    '2D', -- Dimension
    'HD', -- Definition
    true, -- Caption (true or false)
    true, -- Licensed Content (true or false)
    'sample projection', -- Projection
    1000, -- View Count
    500, -- Like Count
    50, -- Favorite Count
    100, -- Comment Count
    '{"category1", "category2"}' -- Topic Categories as an array
);
