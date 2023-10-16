// import React from 'react';

import Navbar from "../../components/Navbar/Navbar";

import styles from "./HomePage.module.css"; // Import the styles

function HomePage() {
  return (
    <div>
      <Navbar />
      <h3 className={styles["home-title"]}>Welcome to My App</h3>
      <div className={styles["home-description"]}>
        <p>Click Channel to search by YouTube Channel.</p>
        <p>Click Video to search by YouTube video.</p>
      </div>
    </div>
  );
}

export default HomePage;
