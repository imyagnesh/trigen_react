import React, { Component } from 'react';

class ErrorWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: error,
    };
  }

  componentDidCatch(error, info) {
    console.log('error', error);
    console.log('info', info.componentStack);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <h1>{hasError.message}</h1>;
    }

    return <>{children}</>;
  }
}

export default ErrorWrapper;
