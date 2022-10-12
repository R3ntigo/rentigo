import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductUpload } from './product-upload/ProductUpload';
import { ProductShow } from './product-show/ProductShow';

const App = () => (
	<>
		<p className="text-yellow-500 text-2xl font-extrabold">Welcome Frontend</p>
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/show" element={<ProductShow />} />
					<Route path="/upload" element={<ProductUpload />} />
				</Routes>
			</BrowserRouter>
		</div>
	</>
);

export default App;
