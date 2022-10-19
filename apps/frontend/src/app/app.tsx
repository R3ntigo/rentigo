import { Routes, Route } from 'react-router-dom';

import { ProductUpload } from './product-upload/ProductUpload';
import { ProductShow } from './product-show/ProductShow';
import { ProductRentReq } from './product-rent-req/ProductRentReq';
import { Home } from './home/home';
import { SignIn } from './signin/sign-in';

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/signin" element={<SignIn />} />
		<Route path="/show" element={<ProductShow />} />
		<Route path="/upload" element={<ProductUpload />} />
		<Route path="/rent/:id" element={<ProductRentReq />} />
	</Routes>
);

export { App };
