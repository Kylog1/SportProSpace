"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional custom fallback. Defaults to a neutral error message. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production you'd send this to Sentry / Datadog / etc.
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-red-100 bg-red-50 px-6 py-8 text-center text-sm text-red-600">
            Nie udało się załadować tej sekcji. Odśwież stronę.
          </div>
        )
      );
    }

    return this.props.children;
  }
}
