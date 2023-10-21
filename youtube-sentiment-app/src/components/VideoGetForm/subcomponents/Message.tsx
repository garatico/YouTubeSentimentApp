interface MessageProps {
  status: "success" | "error" | "no-data" | "default";
  message: string;
}

function Message({ status, message }: MessageProps) {
  let messageClass = "default-message";

  switch (status) {
    case "success":
      messageClass = "success-message";
      break;
    case "error":
      messageClass = "error-message";
      break;
    case "no-data":
      messageClass = "no-data-message";
      break;
    default:
      messageClass = "default-message";
  }

  return <div className={messageClass}>{message}</div>;
}

export default Message;
