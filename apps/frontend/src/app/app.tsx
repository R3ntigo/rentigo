import { Routes, Route, Link } from 'react-router-dom';

import { Home } from './home/home';
import { SignIn } from './signin/sign-in';
import { ProductUploadWithAuth } from './product-upload/ProductUpload';
import { ProductShowWithAuth } from './product-show/ProductShow';

const App = () => (
	<>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/sign-in">Sign In</Link>
			<Link to="/upload">Product Upload</Link>
			<Link to="/show">Product Show</Link>
		</nav>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/show" element={<ProductShowWithAuth />} />
			<Route path="/upload" element={<ProductUploadWithAuth />} />
		</Routes>
	</>
);

export { App };
