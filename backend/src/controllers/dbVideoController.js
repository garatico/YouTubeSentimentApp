const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "YouTubeSentimentData",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const dbVideoHandleRoute = async (req, res) => {
  const queryText = "SELECT * FROM videos";

  pool.query(queryText, (dbError, dbResult) => {
    if (dbError) {
      console.error("Error executing the database query:", dbError);
      res.status(500).send("Internal server error");
    } else {
      const dbRows = dbResult.rows;

      if (dbRows.length > 0) {
        // Videos exist in the database
        console.log("Videos found in the database:");
        res.json(dbRows); // Send the videos as JSON response
      } else {
        // Videos do not exist in the database
        console.log("Videos not found in the database");
        res.json([]); // Send an empty array if no videos found
      }
    }
  });
};

module.exports = {
  dbVideoHandleRoute,
};
