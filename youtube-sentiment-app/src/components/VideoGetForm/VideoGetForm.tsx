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
interface VideoGetFormProps { endpoints: string[]; }

function VideoGetForm({ endpoints }: VideoGetFormProps) {
  // STATE: The following state variables are used to manage component state.
  const inputPlaceholder = "Enter Video ID";
  const [videoId, setVideoId] = useState("");
  const [apiCallStatus, setApiCallStatus] = useState<"success" | "error" | "no-data" | "default">("default");

  // EVENT HANDLER: Handles changes in the input field for Video ID.
  const handleVideoIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoId(event.target.value);
  };

  const makeRequests = async () => {
    for (const endpoint of endpoints) {
      try {
        const response = await makeApiCall(endpoint, videoId);
  
        if (response.status === 200) {
          if (response.data.status === "no-data") {
            handleNoData(setApiCallStatus);
          } else if (response.data.status === "success") {
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
    }
  };
  
  return (
    <div className={styles["video-form"]}>
      <form>
        <InputTextField placeholder={inputPlaceholder} onChange={handleVideoIdChange} />
        <button type="button" onClick={makeRequests} className={styles["search-button"]}>
          Search
        </button>
      </form>
      <Message status={apiCallStatus}/>
    </div>
  );
  
}

export default VideoGetForm;
