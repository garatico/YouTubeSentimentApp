const videoController = require("../../../../controllers/videoController");

const videoExistenceCheck = videoController.videoExistenceCheck;
const videoHandleRequest = videoController.videoHandleRequest;

const videoHandleRoute = async (req, res) => {
  try {
    const videoExists = await videoExistenceCheck(req);

    if (videoExists) {
      console.log("Video already exists in the database");
      res.status(200).json({ message: "Video already exists in the database", status: "data-exists" });
    } else {
      console.log("Making API call...");
      videoHandleRequest(req, res);
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error });
  }
};

module.exports = { videoHandleRoute };
