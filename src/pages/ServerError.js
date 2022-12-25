import React from 'react';
import ErrorWithCode from './ErrorWithCode';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch() {
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <ErrorWithCode code={500} />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
