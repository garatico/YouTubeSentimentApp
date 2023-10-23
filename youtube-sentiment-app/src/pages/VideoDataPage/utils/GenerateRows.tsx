// In tableUtils.ts

interface VideoData {
    videoFiles: string[];
    captionListFiles: string[];
    commentThreads: string[];
}
  
export const generateRows = (videoData: VideoData) => {
  // Create an array of unique video IDs
  const videoIds = [...new Set(videoData.videoFiles.map((videoFile) => videoFile.split(".")[0]))];
  
  // Generate rows based on video IDs
  const rows = videoIds.map((videoId, index) => {
    const videoFile = videoData.videoFiles.find((file) => file.startsWith(videoId)) || "N/A";
    const captionListFile = videoData.captionListFiles.find((file) => file.startsWith(videoId)) || "N/A";
    const commentThread = videoData.commentThreads.find((file) => file.startsWith(videoId)) || "N/A";
  
    return (
      <tr key={index}>
        <td>{videoFile}</td>
        <td>{captionListFile}</td>
        <td>{commentThread}</td>
      </tr>
    );
  });
  
  return rows;
};
  