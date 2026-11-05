import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    try {
      window.localStorage.clear();
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '40px auto', background: '#FAF3F2', borderRadius: '12px', border: '1px solid #EAE6E4', color: '#242326' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '12px', color: '#A2626A' }}>Something went wrong loading the storefront.</h2>
          <p style={{ fontSize: '14px', marginBottom: '20px', color: '#5F5D61' }}>
            An unexpected error occurred during rendering. You can view the details below or reset the storefront state to defaults.
          </p>
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', overflow: 'auto', maxHeight: '200px', fontSize: '12px', border: '1px solid #EAE6E4', marginBottom: '20px', fontFamily: 'monospace' }}>
            <strong>{this.state.error?.toString()}</strong>
            <pre style={{ marginTop: '8px', whiteSpace: 'pre-wrap', color: '#77747A' }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#A2626A', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
            >
              Reload Page
            </button>
            <button
              onClick={this.handleReset}
              style={{ background: '#FFFFFF', color: '#242326', border: '1px solid #EAE6E4', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
            >
              Reset Storage & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

