DROP TABLE IF EXISTS channels;

CREATE TABLE channels (
    channel_id TEXT PRIMARY KEY,
    
    -- Within Snippet
    title TEXT,
    description TEXT,
    customUrl TEXT,
    country TEXT, 
    publishedAt TIMESTAMP,
    
    -- Within Content Details
    likesPlaylist TEXT,
    uploadsPlaylist TEXT,
    
    -- Within Statistics
    viewCount INTEGER,
    subscriberCount INTEGER,
    hiddenSubscriberCount BOOLEAN,
    videoCount INTEGER,
    
    fetchTimestamp TIMESTAMP
);
