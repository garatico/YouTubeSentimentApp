// import React from 'react';
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import VideoGetForm from "../../components/VideoGetForm/VideoGetForm";

import styles from "./VideoGetPage.module.css"; // Import the styles

function VideoGetPage() {
  useEffect(() => { document.title = "VIDEO"; }, []);
  return (
    <div>
      <Navbar />
      <div className={styles["page-content"]}>
        <p className={styles["page-description"]}>
          YouTube Video Endpoints:
        </p>
        <div className={styles["video-endpoints"]}>
          <div className={styles["video-get-component"]} id={styles["video-get"]}>
            <div className={styles["video-get-desc"]}>
              <p>Video Statistics: </p>
            </div>
            <div className={styles["video-get-form"]}>
              <VideoGetForm endpoints={["searchVideo"]} />
            </div>
          </div>
          <div className={styles["video-get-component"]} id={styles["comment-threads-get"]}>
            <div className={styles["video-get-desc"]}>
              <p>Comments: </p>
            </div>
            <div className={styles["video-get-form"]}>
              <VideoGetForm endpoints={["searchCommentThreads"]} />
            </div>
          </div>
          <div className={styles["video-get-component"]} id={styles["caption-get"]}>
            <div className={styles["video-get-desc"]}>
              <p>Captions: </p>
            </div>
            <div className={styles["video-get-form"]}>
              <VideoGetForm endpoints={["searchCaption"]} />
            </div>
          </div>
          <div className={styles["video-get-component"]} id={styles["all-get"]}>
            <div className={styles["video-get-desc"]}>
              <p>All Video Data: </p>
            </div>
            <div className={styles["video-get-form"]}>
              <VideoGetForm
                endpoints={[
                  "searchVideo",
                  "searchCommentThreads",
                  "searchCaption",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGetPage;
