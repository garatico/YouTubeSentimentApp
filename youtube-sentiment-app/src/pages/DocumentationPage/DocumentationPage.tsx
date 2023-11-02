import { useEffect, useState } from "react"; // Import useEffect and useState
import Navbar from "../../components/Navbar/Navbar";
import styles from "./DocumentationPage.module.css"; // Import the styles

function DocumentationPage() {
  const [data, setData] = useState({ columns: [] }); // Initialize data with an empty array

  useEffect(() => {
    document.title = 'DOCUMENTATION';
    // Replace with the correct path to your DatabaseDefinitions.json file
    fetch("/DatabaseDefinitions.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  // Render the table with JSON data
  const renderTable = () => {
    if (!data) {
      return null;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Column Name:</th>
            <th>Data Type:</th>
            <th>Description:</th>
          </tr>
        </thead>
        <tbody>
          {data.columns.map((column: any, index: any) => (
            <tr key={index}>
              <td className={styles["column-name"]}>{column["Column Name"]}</td>
              <td>{column["Data Type"]}</td>
              <td>{column["Description"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Navbar />
      <div className={styles["page-content"]}>
        <div className={styles["db-definitions"]}>
          <div>Videos Database Definitions:</div>
          <p>
            This database schema is designed to store comprehensive information
            about YouTube videos, allowing for various analysis, tracking, and
            retrieval of video data. It's a valuable resource for content
            creators, analysts, and YouTube enthusiasts to gain insights into
            the platform's video content. In this database, we store information
            about YouTube videos. Each record represents a unique video and
            contains the following fields:
          </p>
          <div>{renderTable()}</div>
        </div>
      </div>
    </div>
  );
}

export default DocumentationPage;
