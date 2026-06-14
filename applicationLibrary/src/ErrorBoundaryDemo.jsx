import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import CrashyWeatherWidget from './CrashyWeatherWidget';

/**
 * ErrorBoundaryDemo - Demonstrates how Error Boundaries protect the app.
 * 
 * The weather widget is wrapped in an ErrorBoundary so that if it crashes,
 * only that widget shows an error message, and the rest of the dashboard remains functional.
 */
function ErrorBoundaryDemo() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎯 Error Boundary Lab Demo</h1>
      <p>
        This page demonstrates how Error Boundaries protect your app from crashing completely
        when a single component fails.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {/* Left column: Protected widget */}
        <div>
          <h2>Widget with Error Boundary</h2>
          <p style={{ fontSize: '0.9em', color: '#666' }}>
            This widget is wrapped in an ErrorBoundary. If it crashes, you'll see a
            friendly error message.
          </p>
          <ErrorBoundary>
            <CrashyWeatherWidget />
          </ErrorBoundary>
        </div>

        {/* Right column: Other content */}
        <div>
          <h2>Rest of Dashboard</h2>
          <p style={{ fontSize: '0.9em', color: '#666' }}>
            Even if the weather widget crashes, this content stays visible and interactive.
          </p>
          <div
            style={{
              border: '1px solid #4caf50',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f1f8e9',
            }}
          >
            <h3 style={{ marginTop: 0, color: '#2e7d32' }}>📊 Analytics</h3>
            <ul>
              <li>New followers: 42</li>
              <li>Engagement rate: 8.5%</li>
              <li>Posts this week: 12</li>
            </ul>
          </div>
          <div
            style={{
              border: '1px solid #2196f3',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#e8f5e9',
              marginTop: '16px',
            }}
          >
            <h3 style={{ marginTop: 0, color: '#1565c0' }}>💬 Recent Messages</h3>
            <p>You have 5 unread messages.</p>
            <button
              style={{
                padding: '8px 12px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              View Messages
            </button>
          </div>
        </div>
      </div>

      <hr style={{ marginTop: '40px', borderColor: '#ddd' }} />

      <h2>How It Works</h2>
      <ol>
        <li>
          <strong>Without Error Boundary:</strong> If the weather widget crashes, the entire
          page goes blank.
        </li>
        <li>
          <strong>With Error Boundary:</strong> Only the weather widget shows an error. The
          dashboard remains fully functional.
        </li>
        <li>
          <strong>Try it:</strong> Click "Simulate Server Crash" in the weather widget above
          to see the error boundary in action.
        </li>
      </ol>

      <h2>Key Takeaways</h2>
      <ul>
        <li>
          Error Boundaries are class components that catch rendering errors in child components.
        </li>
        <li>
          They use <code>getDerivedStateFromError()</code> to switch to a fallback UI.
        </li>
        <li>
          Error Boundaries do <strong>not</strong> catch errors in event handlers or async
          code — for those, use try/catch.
        </li>
        <li>
          Always wrap potentially unstable third-party widgets with Error Boundaries.
        </li>
      </ul>
    </div>
  );
}

export default ErrorBoundaryDemo;
