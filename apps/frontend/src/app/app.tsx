import { Routes, Route } from 'react-router-dom';

import { ProductRentReq } from './product-rent-req/ProductRentReq';
import { Home } from './home/home';
import { ProductUploadWithAuth, ProductUpload } from './product-upload/ProductUpload';
import { ProductShowWithAuth } from './product-show/ProductShow';
import { enableFreezeUI } from './util/freezeui/freezeui';
import { SideBar } from './navbar/Navbar';
import { Dashboard } from './dashboard/Dashboard';
import { SignIn2 } from './signin/sign-in-new';
import { ListedProduct } from './dashboard/ListedProduct';
import { RequestforRent } from './dashboard/RequestforRent';

enableFreezeUI();

const App = () => (
	<div className="flex w-full">
		<SideBar />
		<div className="grow h-full">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-in" element={<SignIn2 />} />
				<Route path="/show" element={<ProductShowWithAuth />} />
				<Route path="/upload" element={<ProductUploadWithAuth />} />
				<Route path="/uploadinsecured" element={<ProductUpload />} />
				<Route path="/rent/:id" element={<ProductRentReq />} />
				<Route path="/testNavbar" element={<SideBar />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/listed-product" element={<ListedProduct />} />
				<Route path="/rent-req-dash" element={<RequestforRent />} />
			</Routes>
		</div>
	</div>
);

export { App };
