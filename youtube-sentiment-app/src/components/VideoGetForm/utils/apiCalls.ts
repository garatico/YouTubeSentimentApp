// apiCalls.ts
import axios from "axios";

export async function makeApiCall(endpoint: string, videoId: string) {
  return await axios.get(`http://localhost:3000/api/${endpoint}/`, {
    params: { videoId },
  });
}
