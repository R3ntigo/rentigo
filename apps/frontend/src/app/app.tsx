import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ProductRentReqWithAuth } from './product-rent-req/ProductRentReq';
import { Home } from './home/home';
import { ProductUploadWithAuth, ProductUpload } from './product-upload/ProductUpload';
import { ProductShowWithAuth } from './product-show/ProductShow';
import { enableFreezeUI } from './util/freezeui/freezeui';
import { SideBar } from './navbar/Navbar';
import { Dashboard } from './dashboard/Dashboard';
import { SignIn2 } from './signin/sign-in-new';
import { ListedProduct } from './dashboard/ListedProduct';
import { RequestforRentWithAuth } from './dashboard/RequestforRent';
import { RequestDetailWithAuth } from './dashboard/RequestDetailPage';
import { store } from './store/store';
import { Portrait } from './register/portrait';
import { NIDPhoto } from './register/nid-photo';
import { ConfirmNID } from './register/confirm-nid';
import { ConfirmEmail } from './register/confirm-email';
import { VerifyEmail } from './register/verify-emai';
import { ConfirmPassword } from './register/verify-password';

enableFreezeUI();

const App = () => (
	<Provider store={store}>
		<div className="flex w-full">
			<SideBar />
			<div className="grow h-full">
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/sign-in" element={<SignIn2 />} />
					<Route path="/show/:id" element={<ProductShowWithAuth />} />
					<Route path="/upload" element={<ProductUploadWithAuth />} />
					<Route path="/uploadinsecured" element={<ProductUpload />} />
					<Route path="/rent/:id" element={<ProductRentReqWithAuth />} />
					<Route path="/testNavbar" element={<SideBar />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/listed-product" element={<ListedProduct />} />
					<Route path="/rent-req-dash" element={<RequestforRentWithAuth />} />
					<Route path="/rent-req-detail/:id" element={<RequestDetailWithAuth />} />
					<Route path="/register" element={<NIDPhoto />} />
					<Route path="/register/verify-photo" element={<Portrait />} />
					<Route path="/register/verify-personal-info" element={<ConfirmNID />} />
					<Route path="/register/confirm-email" element={<ConfirmEmail />} />
					<Route path="/register/verify-email/:id" element={<VerifyEmail />} />
					<Route path="/register/verify-password" element={<ConfirmPassword />} />
					<Route path="/register/complete" element={<Dashboard />} />
					<Route path="*" element={<div>404</div>} />
				</Routes>
			</div>
		</div>
	</Provider>
);

export { App };
