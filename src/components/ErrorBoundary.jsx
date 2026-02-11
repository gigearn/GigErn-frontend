import React from "react";
import Icon from "@/components/elements/Icon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    error.__ErrorBoundary = true;
    window.__COMPONENT_ERROR__?.(error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8 max-w-md">
            <div className="flex justify-center items-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-error/10">
                <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-center mb-6">
              <h1 className="text-2xl font-medium text-foreground">Something went wrong</h1>
              <p className="text-muted-foreground text-base">
                We encountered an unexpected error while processing your request.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm"
              >
                <Icon name="ArrowLeft" size={18} />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props?.children;
  }
}

export default ErrorBoundary;
