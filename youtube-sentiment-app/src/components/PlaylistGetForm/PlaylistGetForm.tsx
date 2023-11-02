import { useState } from 'react';
import axios from 'axios'; // Import Axios

import styles from "./PlaylistGetForm.module.css"; // Import the styles

import InputField from "./InputTextField";

function PlaylistGetForm() {
  const [playlistId, setPlaylistId] = useState("");

  const handleInputValueChange = (event: any) => {
    setPlaylistId(event.target.value);
  };
  const handleSubmit = async (event:any) => {
    event.preventDefault();
  
    try {
      const response = await axios.get('http://localhost:3000/api/searchPlaylist/', {
        params: { playlistId: playlistId }
      });

      console.log('Response from backend:', response.data);

    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles["playlist-get-form"]}>
      <form onSubmit={handleSubmit}>
        <InputField placeholder="Playlist ID" onChange={handleInputValueChange}/>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default PlaylistGetForm;
