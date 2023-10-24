import React from 'react';

interface VideoData {
  filename: string;
  created_at: string;
  format: string;
}

interface VideoManifestTableProps {
  videoManifest: VideoData[];
}

const generateVideoManifestTable: React.FC<VideoManifestTableProps> = ({ videoManifest }) => {
  return (
    <div>
      <h4>Video Manifest</h4>
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Created At</th>
            <th>Format</th>
          </tr>
        </thead>
        <tbody>
          {videoManifest.map((video, index) => (
            <tr key={index}>
              <td>{video.filename}</td>
              <td>{video.created_at}</td>
              <td>{video.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default generateVideoManifestTable;
