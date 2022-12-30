import axios from 'axios';
import { withAuth } from '../auth/withAuth';

const SignOut = () => {
	axios.get('/api/auth/sign-out');
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<p className="text-2xl font-bold">Sign Out</p>
			<p>
				You have been signed out.
			</p>
		</div>
	);
};

const SignOutWithAuth = withAuth(SignOut);
export { SignOut, SignOutWithAuth };
