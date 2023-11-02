// React Imports
import { useEffect, useState } from "react";
// Component Imports
import Navbar from "../../components/Navbar/Navbar";
import generateManifestTabs from "./utils/GenerateManifestButtons";
import generateManifestTable from "./utils/GenerateTable";
// Function Imports
import { fetchManifestData, refreshManifest } from "./utils/manifestAPI";

import styles from "./VideoDataPage.module.css";

const manifestTabs = ['Videos', 'Comment Threads', 'Captions'];
const manifestColumnHeaders = ['Filename', 'Video ID', 'Created At', 'Format'];
const manifestTitles = ['Video Manifest', 'Comments Manifest'];

interface ManifestDataStructure {
  filename: string;
  video_id: string;
  created_at: string;
  format: string;
}

function VideoDataPage() {
  const [activeManifest, setActiveManifest] = useState('Videos');
  const [videoManifest, setVideoManifest] = useState<ManifestDataStructure[]>([]);
  const [commentsManifest, setCommentsManifest] = useState<ManifestDataStructure[]>([]);

  useEffect(() => {
    document.title = 'VIDEO DATA';
    fetchManifestData("readVideoManifest", setVideoManifest);
    fetchManifestData("readCommentsManifest", setCommentsManifest);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles["page-content"]}>
        <h3 className={styles["page-description"]}>
          Browse the raw JSON of videos, captions, and comment threads.
        </h3>
        
        <div className={styles["manifest-buttons-container"]}>
          {generateManifestTabs(manifestTabs, setActiveManifest)}
        </div>

        <div className={styles["manifest-table-container"]}>
          <button className={styles["refresh-manifest"]} onClick={() => refreshManifest(activeManifest, activeManifest === "Videos" ? setVideoManifest : setCommentsManifest)}>
            Refresh Manifest
          </button>
          {generateManifestTable({ 
            manifestData: activeManifest === 'Videos' ? videoManifest : commentsManifest, 
            columnHeaders: manifestColumnHeaders, 
            title: activeManifest === 'Videos' ? manifestTitles[0] : manifestTitles[1] 
          })}
        </div>
      </div>
    </div>
  );
}

export default VideoDataPage;
