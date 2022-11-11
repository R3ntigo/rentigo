import { Routes, Route, Link } from 'react-router-dom';

import { ProductRentReq } from './product-rent-req/ProductRentReq';
import { Home } from './home/home';
import { SignIn } from './signin/sign-in';
import { ProductUploadWithAuth } from './product-upload/ProductUpload';
import { ProductShowWithAuth } from './product-show/ProductShow';
import { enableFreezeUI } from './util/freezeui/freezeui';
import { SignOutButton } from './signout/components/signout-button';

enableFreezeUI();

const App = () => (
	<>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/upload">Product Upload</Link>
			<Link to="/show">Product Show</Link>
			<Link to="/sign-in">Sign In</Link>
			<SignOutButton />
		</nav>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/show" element={<ProductShowWithAuth />} />
			<Route path="/upload" element={<ProductUploadWithAuth />} />
			<Route path="/rent/:id" element={<ProductRentReq />} />
		</Routes>
	</>
);

export { App };
