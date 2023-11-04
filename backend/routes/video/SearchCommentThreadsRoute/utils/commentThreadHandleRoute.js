const commentThreadController = require("../../../../controllers/commentThreadController");

const commentThreadExistenceCheck = commentThreadController.commentThreadExistenceCheck;
const commentThreadHandleRequest = commentThreadController.commentThreadHandleRequest;

const commentThreadHandleRoute = async (req, res) => {
  try {
    const commentThreadExists = await commentThreadExistenceCheck(req);

    if (commentThreadExists) {
      console.log("Comments already exists in the database");
      res.status(200).json({ message: "Comments already exists in the database", status: "data-exists" });
    } else {
      console.log("Making API call...");
      commentThreadHandleRequest(req, res);
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error });
  }
};

module.exports = { commentThreadHandleRoute };
