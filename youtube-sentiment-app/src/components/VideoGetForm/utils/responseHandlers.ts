// responseHandlers.ts

// Handle success with items
export function handleSuccess(setApiCallStatus: React.Dispatch<React.SetStateAction<"success" | "error" | "no-data" | "default">>) {
  setApiCallStatus("success"); // Set the status to "success"
}

// Handle the case where no data is found
export function handleNoData(setApiCallStatus: React.Dispatch<React.SetStateAction<"success" | "error" | "no-data" | "default">>) {
  setApiCallStatus("no-data");
}

