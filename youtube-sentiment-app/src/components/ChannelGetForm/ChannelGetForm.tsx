import { useState } from 'react';
import axios from 'axios'; // Import Axios

import RadioInputGroup from './RadioInputGroup';
import InputField from './InputTextField';

import styles from "./ChannelGetForm.module.css"; // Import the styles

function ChannelGetForm() {
  const [channelInputType, setChannelInputType] = useState('name');
  const [channelInputValue, setChannelInputValue] = useState('');
  const inputPlaceholder = channelInputType === 'name' ? 'Enter Channel Name' : 'Enter Channel ID';

  const handleInputChange = (event:any) => {
    setChannelInputType(event.target.value);
  };

  const handleInputValueChange = (event:any) => {
    setChannelInputValue(event.target.value);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
  
    try {
      // Send a GET request to the backend on port 3000 with channelInputType and channelInputValue as query parameters
      const response = await axios.get('http://localhost:3000/api/searchChannel/', {
        params: {
          channelInputType: channelInputType,
          channelInputValue: channelInputValue,
        }
      });
  
      // Access the properties from the JSON response and log them separately
      // const inputTypeFromBackend = response.data.channelInputType;
      // const inputValueFromBackend = response.data.channelInputValue;
  
      // Log the type and value on separate lines
      // console.log('Type from backend:', inputTypeFromBackend);
      // console.log('Value from backend:', inputValueFromBackend);

      console.log('Response from backend:', response.data);

    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error:', error);
    }
  };
  
  
  return (
    <div className={styles["channel-get-form"]}>
      <form onSubmit={handleSubmit}>
        <RadioInputGroup inputType={channelInputType} onInputChange={handleInputChange} />
        <InputField inputType={channelInputType} placeholder={inputPlaceholder} onChange={handleInputValueChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default ChannelGetForm;
