import { Button } from "@/components/ui/button";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black/80 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="text-slate-500 mb-4">
            An unexpected error occurred in the application. Please try
            refreshing the page.
          </p>

          {import.meta.env.VITE_NODE_ENV === "development" &&
            this.state.error && (
              <div className="text-left max-w-2xl bg-white shadow-xl p-4 rounded-md border border-red-400 mb-4 overflow-auto max-h-64 w-full">
                <p className="text-red-400 font-semibold mb-2">
                  Error Details:
                </p>
                <pre className="text-sm whitespace-pre-wrap break-all text-red-200">
                  {this.state.error?.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

          <Button
                  onClick={this.handleReload}
          >
            Reload Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
