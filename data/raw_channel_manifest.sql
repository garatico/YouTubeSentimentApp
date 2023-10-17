DROP TABLE IF EXISTS raw_channel_manifest;

CREATE TABLE raw_channel_manifest (
    file_id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    download_date TIMESTAMP DEFAULT NOW(),
    description TEXT
);






