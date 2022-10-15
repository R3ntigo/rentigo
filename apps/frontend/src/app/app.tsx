import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductUpload } from './product-upload/ProductUpload';
import { ProductShow } from './product-show/ProductShow';
import { ImageUpload } from './product-upload/ImageUpload';
const App = () => (
	<>
		<p className="text-yellow-500 text-2xl font-extrabold">Welcome Frontend</p>
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<ProductUpload />} />
					<Route path="/show" element={<ProductShow />} />
					<Route path="/upload" element={<ProductUpload />} />
					<Route path="/testuploadPic" element={<ImageUpload />} />
				</Routes>
			</BrowserRouter>
		</div>
	</>
);

export { App };
