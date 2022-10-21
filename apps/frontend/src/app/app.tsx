import { Routes, Route, Link } from 'react-router-dom';

import { ProductRentReq } from './product-rent-req/ProductRentReq';
import { Home } from './home/home';
import { SignIn } from './signin/sign-in';
import { ProductUploadWithAuth } from './product-upload/ProductUpload';
import { ProductShowWithAuth } from './product-show/ProductShow';
import { enableFreezeUI } from './util/freezeui/freezeui';
import { SignOutButton } from './signout/components/signout-button';
import { Register } from './register/register';
import { SignIn2 } from './signin/sign-in-new';
import { SideBar } from './navbar/Navbar';

enableFreezeUI();

const App = () => (
	<>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/upload">Product Upload</Link>
			<Link to="/show">Product Show</Link>
			<Link to="/sign-in">Sign In</Link>
			<SignOutButton />
			<Link to="/register">Register</Link>
		</nav>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/sign-in2" element={<SignIn2 />} />
			<Route path="/show" element={<ProductShowWithAuth />} />
			<Route path="/upload" element={<ProductUploadWithAuth />} />
			<Route path="/register" element={<Register />} />
			<Route path="/rent/:id" element={<ProductRentReq />} />
			<Route path="/testNavbar" element={<SideBar />} />
		</Routes>
	</>
);

export { App };
