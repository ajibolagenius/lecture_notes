import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught a render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong loading this page. Please try refreshing.</p>;
    }
    return this.props.children;
  }
}
