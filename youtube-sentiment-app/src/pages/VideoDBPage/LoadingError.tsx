// LoadingError.tsx
import React from 'react';

interface LoadingErrorProps {
  loading: boolean;
  error: string | null;
}

const LoadingError: React.FC<LoadingErrorProps> = ({ loading, error }) => (
  <div>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
  </div>
);

export default LoadingError;
