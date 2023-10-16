import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

import styles from "./VideoDataPage.module.css"; // Import the styles

interface VideoData {
  files: string[];
}

function VideoDataPage() {
  const [videoData, setVideoData] = useState<VideoData>({ files: [] });

  const fetchVideoData = async () => {
    try {
      const response = await axios.get<VideoData>(
        "http://localhost:3000/api/viewVideoData"
      );

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
          <h2 className={styles["page-description"]}>
            Browse the raw JSON of videos.
          </h2>
        </div>
        <div>
          <div className={styles["files-list-div"]}>
            <ul className={styles["files-ul"]}>
              {videoData.files.map((file, index) => (
                <li className={styles["files-li"]} key={index}>
                  {file}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDataPage;
