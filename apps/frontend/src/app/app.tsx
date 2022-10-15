import { Routes, Route } from 'react-router-dom';

import { Home } from './home/home';
import { SignIn } from './signin/sign-in';

const App = () => (
	<>
		<p className="text-yellow-500 text-2xl font-extrabold">Welcome Frontend</p>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signin" element={<SignIn />} />
		</Routes>
	</>
);

export { App };
