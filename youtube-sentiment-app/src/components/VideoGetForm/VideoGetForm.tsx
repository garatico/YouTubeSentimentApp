import { useState } from "react";
import InputTextField from "./subcomponents/InputTextField";
import Message from "./subcomponents/Message";

// Import the functions
import { makeApiCall } from "./utils/apiCalls";
import { handleSuccess, handleNoData } from "./utils/responseHandlers";
import { handleOtherError } from "./utils/errorHandlers";

import styles from "./VideoGetForm.module.css"; // Import the styles

// INTERFACE: Defines the expected shape of props VideoGetForm can receive.
// Props:
// endpoint: Represents the API endpoint for requests.
interface VideoGetFormProps { endpoint: string; }

function VideoGetForm({ endpoint }: VideoGetFormProps) {
  // STATE: The following state variables are used to manage component state.
  const inputPlaceholder = "Enter Video ID";
  const [videoId, setVideoId] = useState("");
  const [apiCallStatus, setApiCallStatus] = useState<"success" | "error" | "no-data" | "default">("default");

  // EVENT HANDLER: Handles changes in the input field for Video ID.
  const handleVideoIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await makeApiCall(endpoint, videoId);
  
      if (response.status === 200) {
        if(response.data.status == "no-data") {
          handleNoData(setApiCallStatus);
        } else if(response.data.status == "success") {
          handleSuccess(setApiCallStatus);
        }
      } else if (response.status === 404) {
        handleNoData(setApiCallStatus);
      } else {
        handleOtherError(response.statusText, setApiCallStatus);
      }
    } catch (error) {
      handleOtherError(error, setApiCallStatus);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputTextField
          placeholder={inputPlaceholder}
          onChange={handleVideoIdChange}
        />
        <button type="submit" className={styles["search-button"]}>Search</button>
      </form>
      <Message
      status={apiCallStatus}
      message={
        apiCallStatus === "success" ? "API call was successful" : 
        apiCallStatus === "error" ? "API call failed. Please try again later." : 
        apiCallStatus === "no-data" ? "No data found for the given video ID" : 
        ""
      }
    /></div>
  );
}

export default VideoGetForm;
