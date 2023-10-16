import { useState } from 'react';
import axios from 'axios';

import InputTextField from './InputTextField';

function VideoGetForm() {
  const [videoId, setVideoId] = useState('');
  const inputPlaceholder = 'Enter Video ID';

  const handleVideoIdChange = (event:any) => {
    setVideoId(event.target.value);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      // Send a GET request to the backend on port 3000 with the videoId as a query parameter
      const response = await axios.get('http://localhost:3000/api/searchVideo/', {
        params: {
          videoId: videoId,
        }
      });

      // Handle the response data here, e.g., display it to the user
      console.log('Response from backend:', response.data);
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputTextField placeholder={inputPlaceholder} onChange={handleVideoIdChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default VideoGetForm;
