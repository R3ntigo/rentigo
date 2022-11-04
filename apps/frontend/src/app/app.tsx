import { Routes, Route } from 'react-router-dom';

import { ProductRentReq } from './product-rent-req/ProductRentReq';
import { Home } from './home/home';
import { ProductUploadWithAuth, ProductUpload } from './product-upload/ProductUpload';
import { ProductShowWithAuth } from './product-show/ProductShow';
import { enableFreezeUI } from './util/freezeui/freezeui';
import { SignIn2 } from './signin/sign-in-new';
import { SideBar } from './navbar/Navbar';
import { Dashboard } from './dashboard/Dashboard';

enableFreezeUI();

const App = () => (
	<>
		{/* <nav>
			<Link to="/">Home</Link>
			<Link to="/upload">Product Upload</Link>
			<Link to="/show">Product Show</Link>
			<Link to="/sign-in">Sign In</Link>
			<SignOutButton />
			<Link to="/register">Register</Link>
		</nav>
		</nav> */}
		<div className="flex w-full">
			<SideBar />
			<div className="grow h-full">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-in" element={<SignIn2 />} />
					<Route path="/sign-in2" element={<SignIn2 />} />
					<Route path="/show" element={<ProductShowWithAuth />} />
					<Route path="/upload" element={<ProductUploadWithAuth />} />
					<Route path="/uploadinsecured" element={<ProductUpload />} />
					<Route path="/rent/:id" element={<ProductRentReq />} />
					<Route path="/testNavbar" element={<SideBar />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</div>
		</div>
	</>
);

export { App };
