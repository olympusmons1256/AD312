import React, { useState } from 'react';

/**
 * CrashyWeatherWidget - A demo component that can intentionally throw an error.
 * Used to demonstrate how ErrorBoundary catches rendering crashes.
 */
function CrashyWeatherWidget({ shouldCrash = false }) {
  const [crashOnClick, setCrashOnClick] = useState(false);

  // Simulate a rendering error when shouldCrash is true
  if (shouldCrash || crashOnClick) {
    throw new Error(
      'Weather server is down! This widget crashed trying to fetch corrupted data.'
    );
  }

  return (
    <div
      style={{
        border: '1px solid #1976d2',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#e3f2fd',
      }}
    >
      <h3 style={{ marginTop: 0, color: '#1565c0' }}>Weather Widget</h3>
      <p>Current conditions: Sunny, 72°F</p>
      <p style={{ fontSize: '0.9em', color: '#666' }}>
        Next update in 5 minutes...
      </p>
      <button
        onClick={() => setCrashOnClick(true)}
        style={{
          padding: '8px 12px',
          backgroundColor: '#ff9800',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9em',
        }}
      >
        Simulate Server Crash
      </button>
    </div>
  );
}

export default CrashyWeatherWidget;
