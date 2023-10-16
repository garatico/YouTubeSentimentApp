// Define what kind of information (props) this component expects
type InputTextFieldProps = {
  inputType: string;                                               // Expects a string for inputType
  placeholder: string;                                             // Expects a string for placeholder
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;  // Expects a function for onChange
};

// Create the InputTextField component that displays an input field
function InputTextField({ inputType, placeholder, onChange }: InputTextFieldProps) {
  return (
    <div>
      <input
        type="text"
        id={inputType === 'name' ? 'channelNameInput' : 'channelIdInput'}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default InputTextField;

