import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-coral dark:text-sand mx-auto mb-4" />
            <h2 className="text-xl font-light text-gray-800 dark:text-gray-100 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Please try refreshing the page
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}