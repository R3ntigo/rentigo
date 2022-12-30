import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductTile } from '../dashboard/ProductTile';

const Home = () => {
	const [products, setProducts] = useState([]);
	async function fetchProducts() {
		const response = await axios.get('/api/product/pagination/1');
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
				products.map((product) => (
					<ProductTile product={product} />
				))

			}
		</div>
        </>
	);
};

export { Home };
