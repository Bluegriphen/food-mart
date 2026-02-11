import React from 'react';

interface SomethingWentWrongProps {
  error?: Error | null;
  reset?: () => void;
}

const SomethingWentWrong: React.FC<SomethingWentWrongProps> = ({
  error,
  reset,
}) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: 24,
        backgroundColor: '#f8f9fa',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>
        ⚠️ Something went wrong
      </h1>

      <p style={{ marginBottom: 24 }}>
        We’re sorry — an unexpected error has occurred.
      </p>

      {import.meta.env.DEV && error && (
        <details
          style={{
            whiteSpace: 'pre-wrap',
            maxWidth: '600px',
            textAlign: 'left',
            marginBottom: 16,
          }}
        >
          <summary style={{ cursor: 'pointer' }}>
            Error details
          </summary>
          <pre>{error?.message}</pre>
          <pre>{error?.stack}</pre>
        </details>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        {reset && (
          <button
            onClick={reset}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        )}

        <button
          onClick={handleRefresh}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default SomethingWentWrong;
