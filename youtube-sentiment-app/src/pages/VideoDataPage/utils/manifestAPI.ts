// api.ts
import axios from "axios";

type DataSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export async function fetchManifestData<T>(
  apiEndpoint: string,
  setData: DataSetter<T[]>
): Promise<void> {
  try {
    const response = await axios.get(`http://localhost:3000/api/viewVideoData/${apiEndpoint}`);
    setData(response.data);
  } catch (error) {
    console.error(`Error fetching ${apiEndpoint}:`, error);
  }
}

export async function refreshManifest<T>(
  apiEndpoint: string,
  setData: DataSetter<T[]>
): Promise<void> {
  try {
    await axios.post(`http://localhost:3000/api/viewVideoData/update${apiEndpoint}`);
    fetchManifestData(`read${apiEndpoint}`, setData);
  } catch (error) {
    console.error(`Error refreshing ${apiEndpoint}:`, error);
  }
}
