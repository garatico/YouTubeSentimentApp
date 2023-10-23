import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

import { generateRows } from "./utils/GenerateRows"; // Import the generateRows function

import styles from "./VideoDataPage.module.css"; // Import the styles

interface VideoData {
  videoFiles: string[];
  captionListFiles: string[];
  commentThreads: string[];
}

function VideoDataPage() {
  const [videoData, setVideoData] = useState<VideoData>({
    videoFiles: [],
    captionListFiles: [],
    commentThreads: [],
  });

  const fetchVideoData = async () => {
    try {
      const response = await axios.get<VideoData>("http://localhost:3000/api/viewVideoData");
      console.log(response.data);
      setVideoData(response.data);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles["page-content"]}>
        <div>
          <h3 className={styles["page-description"]}>
            Browse the raw JSON of videos, captions, and comment threads.
          </h3>
        </div>

        <div className="temp-manifests">

        </div>

        <div>
          <div className={styles["files-list-div"]}>
            <table className={styles["files-table"]}>
              <thead>
                <tr>
                  <th>Videos</th>
                  <th>Captions List</th>
                  <th>Comment Threads</th>
                </tr>
              </thead>
              <tbody>{generateRows(videoData)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDataPage;
