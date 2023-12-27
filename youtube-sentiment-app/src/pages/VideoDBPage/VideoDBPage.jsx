// React Imports
import { useEffect, useState } from "react";

// Component Imports
import Navbar from "../../components/Navbar/Navbar";
import LoadingError from './LoadingError';
import FormattedTable from './Table/FormattedTable';

// Functional Imports
import axios from "axios";

// Styles Imports
import styles from "./VideoDBPage.module.css";

function VideoDBPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "VIDEO DATABASE";
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/viewVideoData/readVideoDB");
        setData(response.data); // Update state with response.data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <div className={styles["page-content"]}>
          <h3>Browse the database of videos.</h3>
          <LoadingError loading={loading} error={error} />
          {data && <FormattedTable data={data} />}
        </div>
      </div>
    </div>
  );
}

export default VideoDBPage;
