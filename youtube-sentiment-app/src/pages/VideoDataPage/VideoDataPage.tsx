import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import generateManifestTabs from "./utils/GenerateManifestButtons";
import generateVideoManifestTable from "./utils/GenerateTable";
import styles from "./VideoDataPage.module.css"; // Import the styles

const manifestTabs = ['Videos', 'Comment Threads', 'Captions']

interface VideoData {
  filename: string;
  created_at: string;
  format: string;
}

function VideoDataPage() {
  const [videoManifest, setVideoManifest] = useState<VideoData[]>([]);

  const fetchVideoManifest = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/viewVideoData/readVideoManifest");
      setVideoManifest(response.data);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  const refreshVideoManifest = async () => {
    try {
      await axios.post("http://localhost:3000/api/viewVideoData/updateVideoManifest");
      fetchVideoManifest();
    } catch (error) {
      console.error("Error refreshing manifest:", error);
    }
  }

  useEffect(() => {
    // Call the fetchVideoManifest function when the component mounts
    fetchVideoManifest();
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

        <div className={styles["manifest-buttons-container"]}>
          {generateManifestTabs(manifestTabs)}
        </div>

        <div className={styles["video-manifest"]}>
          <button onClick={refreshVideoManifest}>Refresh Manifest</button>
          {generateVideoManifestTable({videoManifest})}
        </div>

      </div>
    </div>
  );
}

export default VideoDataPage;
