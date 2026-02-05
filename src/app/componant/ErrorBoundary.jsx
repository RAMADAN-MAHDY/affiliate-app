'use client';
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <p className="text-center text-[#fff] bg-[#343244] p-4 rounded-xl">
          حدث خطأ أثناء عرض البيانات.
        </p>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
