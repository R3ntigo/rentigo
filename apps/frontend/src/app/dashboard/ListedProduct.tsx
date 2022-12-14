import { useState } from 'react';
import { Product } from '@rentigo/models';
import { Gender } from '@rentigo/constants';
import { ProductTile } from './ProductTile';

const ListedProduct = () => {
	const totalNumberofProducts = 10; // this should be fetched from the backend
	const curruntlyListedProducts = 7; // this should be fetched from the backend
	const availableProducts = totalNumberofProducts - curruntlyListedProducts;

	const [demoProduct, setProducts] = useState<Product[]>([]);

	const getProducts = async () => {
		const res = await fetch('http://localhost:3333/api/product');
		const data = await res.json();
		console.log(data);
	};
	const getTotalNumberOfProducts = async () => {
		const res = await fetch('http://localhost:3333/api/product/count');
		const data = await res.json();
		console.log(data);
	};
	return (
		<>
			<div className="absolute top-6 w-full text-center">
				<h1 className="text-2xl font-semibold">Listed products</h1>
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
			<div className="p-10 ">
				<div className="border-dashed border-2 border-[#f59e0b] rounded-2xl p-2 grid grid-cols-3 gap-2 ">
					<div>
						<p className="text-center">Total Products</p>
						<p className="text-center text-2xl font-semibold">{totalNumberofProducts}</p>
					</div>
					<div>
						<p className="text-center">Currently in rent</p>
						<p className="text-center text-2xl font-semibold">{curruntlyListedProducts}</p>
					</div>
					<div>
						<p className="text-center">Available Product</p>
						<p className="text-center text-2xl font-semibold">{availableProducts}</p>
					</div>
				</div>
				{
					demoProduct.map((product) => (
						<div key={product.id} className="py-4">
							<ProductTile product={product} />
						</div>
					))
				}
			</div>

		</>
	);
};

export { ListedProduct };
