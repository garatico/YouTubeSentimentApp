interface MessageProps {
  status: "success" | "error" | "no-data" | "default";
}

const statusToClass = {
  success: "success-message",
  error: "error-message",
  "no-data": "no-data-message",
  default: "default-message",
};

const statusToMessage = {
  success: "API call was successful",
  error: "API call failed. Please try again later.",
  "no-data": "No data found for the given video ID",
  default: "",
};

function Message({ status }: MessageProps) {
  const messageClass = statusToClass[status];
  const message = statusToMessage[status];

  return <div className={messageClass}>{message}</div>;
}

export default Message;
