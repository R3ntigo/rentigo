import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductTile } from '../dashboard/ProductTile';
import { Product } from '@rentigo/models';
import { withAuth } from '../auth/withAuth';

const Home = () => {
	const [products, setProducts] = useState([]);
	async function fetchProducts() {
		const response = await axios.get('/api/product');
		setProducts(response.data);
	}
	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<>
			<div className="absolute top-6 w-full text-center">
				<h1 className="text-2xl font-semibold">Rentigo</h1>
			</div>
			<div className="h-24 md:p-8  grid grid-cols-3">
				<div
					className="
			bg-primary mix-blend-multiply filter blur-xl opacity-70 "
				/>
				<div
					className="
			bg-secondary mix-blend-multiply filter blur-xl opacity-70 "
				/>
				<div
					className="
			bg-accent1 mix-blend-multiply filter blur-xl opacity-70 "
				/>
			</div>
			<br />
			<br />
			<div>
				{
					products.map((product: Product) => (
						<ProductTile key={product.id} product={product} />
					))

				}
			</div>
			<br />
			<br />
			<br />
		</>
	);
};

const HomeWithAuth = withAuth(Home);
export { Home, HomeWithAuth };
