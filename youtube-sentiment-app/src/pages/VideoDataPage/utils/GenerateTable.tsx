import React from 'react';

interface ManifestDataStructure {
  filename: string;
  video_id: string;
  created_at: string;
  format: string;
}

interface ManifestTableProps {
  manifestData: ManifestDataStructure[];
  columnHeaders: string[];
  title: string;
}

const generateManifestTable: React.FC<ManifestTableProps> = ({ manifestData, columnHeaders, title }) => {
  return (
    <div>
      <h4>{title}</h4>
      <table>
        <thead>
          <tr>
            {columnHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {manifestData.map((video, index) => (
            <tr key={index}>
              <td>{video.filename}</td>
              <td>{video.video_id}</td>
              <td>{video.created_at}</td>
              <td>{video.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default generateManifestTable;
