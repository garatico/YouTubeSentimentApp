// import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import ChannelGetForm from "../../components/ChannelGetForm/ChannelGetForm";
import PlaylistGetForm from "../../components/PlaylistGetForm/PlaylistGetForm";
import { useEffect } from "react";

import styles from "./ChannelGetPage.module.css"; // Import the styles

function ChannelGetPage() {
  useEffect(() => {
    document.title = "CHANNEL";
  }, []);
  return (
    <div>
      <Navbar />
      <div className={styles["page-content"]}>

        <div className={styles["channel-get-component"]} id={styles["channel-get"]}>
          <div className={styles["channel-get-desc"]}>
            <p>YouTube Channel Statistics: </p>
          </div>
          <div className={styles["channel-get-form"]}>
            <ChannelGetForm />
          </div>
        </div>

        <div className={styles["channel-get-component"]} id={styles["playlist-get"]}>
          <div className={styles["channel-get-desc"]}>
            <p>YouTube Playlist Videos: </p>
          </div>
          <div className={styles["channel-get-form"]}>
            <PlaylistGetForm />
          </div>
        </div>
        

      </div>
    </div>
  );
}

export default ChannelGetPage;
