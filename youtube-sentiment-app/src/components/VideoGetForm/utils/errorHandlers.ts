// errorHandlers.ts
export function handleOtherError(error: any, setApiCallStatus: React.Dispatch<React.SetStateAction<"success" | "error" | "no-data" | "default">>) {
    console.error("Error:", error);
    setApiCallStatus("error");
}