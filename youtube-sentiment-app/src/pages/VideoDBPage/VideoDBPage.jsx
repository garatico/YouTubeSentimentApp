// React Imports
import { useEffect, useState } from "react";

// Component Imports
import Navbar from "../../components/Navbar/Navbar";

//import styles from "./VideoDataPage.module.css";

import axios from "axios";

function VideoDBPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "VIDEO DATABASE";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/viewVideoData/readVideoDB"
        );
        setData(response.data); // Update state with response.data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        //setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <h3>Browse the database of videos.</h3>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <div>
            <p>Formatted Table:</p>
            <table>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoDBPage;
