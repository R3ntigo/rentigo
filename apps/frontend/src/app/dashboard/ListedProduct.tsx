import {
	Address,
	Product,
	Request,
	User,
	PricingPolicy,
	RentingPolicy,
	Duration,
	Tag,
	Resource
} from '@rentigo/models';
import { Gender } from '@rentigo/types';
import { ProductTile } from './ProductTile';

const ListedProduct = () => {
	const totalNumberofProducts = 10; // this should be fetched from the backend
	const curruntlyListedProducts = 7; // this should be fetched from the backend
	const availableProducts = totalNumberofProducts - curruntlyListedProducts;
	const demoProduct: Product[] = [{
		id: '1',
		description: 'demo description',
		title: 'demo',
		lender: {
			id: '1',
			firstName: 'demo',
			lastName: 'demo',
			email: 'sakib@gmail.com',
			phone: '01700000000',
			nid: '1234567890',
			gender: Gender.MALE,
			address: [{
				id: '1',
				division: 'dhaka',
				district: 'gazipur',
				subDistrict: 'Ghatail',
				zipCode: '1700',
				details: 'demo details',
				label: 'demo label'
			}],
			requests: [],
			photoUrl: {
				id: '1',
				name: 'demo',
				url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
				size: 1000,
				mimeType: 'image/png'
			},
			rentingPolicies: [],
			products: []

		},
		address: {
			id: '1',
			division: 'dhaka',
			district: 'gazipur',
			subDistrict: 'Ghatail',
			zipCode: '1700',
			details: 'demo details',
			label: 'demo label'
		},
		rentingPolicies: [],
		pricingPolicies: [],
		tags: [],
		family: 'demo',
		imageUrls: [{
			id: '1',
			name: 'demo',
			url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
			size: 1000,
			mimeType: 'image/png'
		}],
		totalQuantity: 10,
		availableQuantity: 10
	}];
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
