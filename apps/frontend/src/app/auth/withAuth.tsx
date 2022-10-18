import { ReactElement } from 'react';
import { useAuth } from './useAuth';

const withAuth = (Component: React.ComponentType) => {
	const WrappedComponent = (): ReactElement => {
		const { isLoading } = useAuth();
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return isLoading ? <></> : <Component />;
	};
	return WrappedComponent;
};

export { withAuth };
