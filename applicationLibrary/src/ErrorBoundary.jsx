import React from 'react';

/**
 * ErrorBoundary - A class component that catches rendering errors in its children.
 * 
 * This component uses getDerivedStateFromError to detect when a child component
 * throws during render, and displays a fallback UI instead of crashing the page.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when an error is caught, so the next render displays fallback UI.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Log error details for debugging purposes.
   */
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            border: '2px solid #d32f2f',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#ffebee',
            margin: '16px 0',
          }}
        >
          <h3 style={{ color: '#d32f2f', marginTop: 0 }}>
            ⚠️ Component Error
          </h3>
          <p style={{ color: '#b71c1c' }}>
            Sorry, this widget encountered an error and couldn't load.
          </p>
          {this.state.error && (
            <details style={{ marginTop: '8px', fontSize: '0.9em' }}>
              <summary>Error details (for developers)</summary>
              <pre
                style={{
                  backgroundColor: '#fff3e0',
                  padding: '8px',
                  borderRadius: '4px',
                  overflowX: 'auto',
                }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo &&
                  '\n\n' + this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
