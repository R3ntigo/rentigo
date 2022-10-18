import { useNavigate } from 'react-router-dom';

import { onSignOut } from '../on-sign-out';

const SignOutButton = () => {
	const navigate = useNavigate();

	return (
		<button
			type="button"
			onClick={
				async () => {
					try {
						await onSignOut();
						navigate('/sign-in');
					} catch (ignored) {
						// ignored
					}
				}
			}
		>
			Sign Out
		</button>
	);
};

export { SignOutButton };
