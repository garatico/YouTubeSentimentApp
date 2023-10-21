// import React from 'react';

import Navbar from "../../components/Navbar/Navbar";

import styles from "./HomePage.module.css"; // Import the styles

function HomePage() {
  return (
    <div>
      <Navbar />
      <h3 className={styles["home-title"]}>
        YouTube API Application and NLP Analysis
      </h3>
      <div className={styles["home-description"]}>
        <p>
          The purpose of this application is to easily interactive with
          YouTube's API to download data to be used for analysis. This data
          includes videos, channels, comments and captions. From here we will
          use NLP to analyze the data gathered.
        </p>
        <p>Channel: Used to search by YouTube Channel.</p>
        <p>Video: Used to search by YouTube video.</p>
        <p>Video Data: Used to view the current set of video data.</p>
        <p>Documentation: Provides database definitions.</p>
      </div>
    </div>
  );
}

export default HomePage;
