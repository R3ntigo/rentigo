import { ReactElement } from 'react';
import { useAuth } from './useAuth';

const withAuth = (Component: React.ComponentType) => {
	const WrappedComponent = (): ReactElement => {
		const { isLoading } = useAuth();
		return isLoading ? <div>Loading...</div> : <Component />;
	};
	return WrappedComponent;
};

export { withAuth };
