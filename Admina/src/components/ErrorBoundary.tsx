import React from 'react';

type Props = {
  children: React.ReactNode;
  fallback?:
    | React.ReactNode
    | ((args: { error: Error | null; reset: () => void }) => React.ReactNode);
  onError?: (error: Error, info: React.ErrorInfo) => void;
};

type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    console.warn('ErrorBoundary.getDerivedStateFromError:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary.componentDidCatch:', error, info);

    if (this.props.onError) {
      try {
        this.props.onError(error, info);
      } catch (e) {
        console.error('ErrorBoundary onError threw:', e);
      }
    }
  }

  reset = () => this.setState({ hasError: false, error: null });

  renderFallback() {
    const { fallback } = this.props;
    const { error } = this.state;

    if (fallback) {
      if (typeof fallback === 'function')
        return fallback({ error, reset: this.reset });

      return fallback;
    }

    return (
      <div style={{ padding: 16 }}>
        <h2>Something went wrong</h2>

        {import.meta.env.DEV ? (
          <details
            style={{
              whiteSpace: 'pre-wrap',
              maxHeight: 300,
              overflow: 'auto',
            }}
          >
            {error?.message}
            <br />
            <pre>{error?.stack}</pre>
          </details>
        ) : (
          <p>
            We’re sorry — something went wrong. Try refreshing the page or
            contact support.
          </p>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button onClick={this.reset} style={{ padding: '8px 12px' }}>
            Try Again
          </button>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state?.hasError) return this.renderFallback();
    return this.props.children;
  }
}
