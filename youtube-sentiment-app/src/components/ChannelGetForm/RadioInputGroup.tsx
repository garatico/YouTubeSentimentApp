import React from 'react';

// Define the type for props
type RadioInputGroupProps = {
    inputType: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

function RadioInputGroup({ inputType, onInputChange }: RadioInputGroupProps) {
    return  (
    <div>
      <input
        type="radio"
        id="channelName"
        value="name"
        checked={inputType === 'name'}
        onChange={onInputChange}
      />
      <label htmlFor="channelName">Channel Name</label>

      <input
        type="radio"
        id="channelId"
        value="id"
        checked={inputType === 'id'}
        onChange={onInputChange}
      />
      <label htmlFor="channelId">Channel ID</label>
    </div>
  );
}

export default RadioInputGroup;
