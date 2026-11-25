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
        <div style={{ padding: '40px', fontFamily: '"Suisse Intl", Inter, system-ui, sans-serif', maxWidth: '800px', margin: '40px auto', background: '#F8F6F0', borderRadius: '12px', border: '1px solid #DCDDD4', color: '#242820' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '12px', color: '#343F32' }}>Something went wrong loading the storefront.</h2>
          <p style={{ fontSize: '14px', marginBottom: '20px', color: '#65685F' }}>
            An unexpected error occurred during rendering. You can view the details below or reset the storefront state to defaults.
          </p>
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', overflow: 'auto', maxHeight: '200px', fontSize: '12px', border: '1px solid #DCDDD4', marginBottom: '20px', fontFamily: 'monospace' }}>
            <strong>{this.state.error?.toString()}</strong>
            <pre style={{ marginTop: '8px', whiteSpace: 'pre-wrap', color: '#6A6D63' }}>
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#343F32', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
            >
              Reload Page
            </button>
            <button
              onClick={this.handleReset}
              style={{ background: '#FFFFFF', color: '#242820', border: '1px solid #DCDDD4', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
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

