// import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import VideoGetForm from "../../components/VideoGetForm/VideoGetForm";

import styles from "./VideoGetPage.module.css"; // Import the styles

function VideoGetPage() {
  return (
    <div>
      <Navbar />
      <div className={styles["page-content"]}>
        <div className={styles["video-get"]}>
          <div className={styles["video-get-desc"]}>
            <p>Find YouTube Video Statistics: </p>
          </div>
          <div className={styles["video-get-form"]}>
            <VideoGetForm endpoint="searchVideo" />
          </div>
        </div>
        <div className={styles["comment-get"]}>
          <div className={styles["video-get-desc"]}>
            <p>Find YouTube Comments: </p>
          </div>
          <div className={styles["video-get-form"]}>
            <VideoGetForm endpoint="searchComment" />
          </div>
        </div>
        <div className={styles["caption-get"]}>
          <div className={styles["video-get-desc"]}>
            <p>Find YouTube Captions: </p>
          </div>
          <div className={styles["video-get-form"]}>
            <VideoGetForm endpoint="searchCaption" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGetPage;
