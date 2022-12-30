import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Product, PricingPolicy, RentingPolicy } from '@rentigo/models';
import { withAuth } from '../auth/withAuth';

const ProductShow = () => {
	const { id } = useParams();
	const [demoProduct, setInitialProductState] = useState<Product>();

	useEffect(() => {
		fetchProduct();
		console.log(demoProduct);
	}, []);
	async function fetchProduct() {
		const response = await fetch(`/api/product/${id}`);
		const data = await response.json();
		console.log(data);
		setInitialProductState(data);
	}
	// fetchProduct();

	// const demoProduct : Product = {

	// };
	if (!demoProduct) return (<div>Loading...</div>);
	return (
		<div className=" mx-auto  rounded justify-center ">
			<img
				src={`${demoProduct.imageUrls[0].url}`}
				alt="ecommerce"
				className="lg:w-1/2   object-cover object-center rounded border border-gray-200"

			/>

			<div className="mx-auto p-6 rounded justify-center">
				<h2
					className="text-sm title-font text-gray-500 tracking-widest"
				>
					{demoProduct.lender.firstName }
					{' '}
					presents
				</h2>
				<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{demoProduct.title}</h1>
				<br />
				<div className="max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-accent1">
					<div className=" pt-1">
						<h4 className="text-xl text-gray-900 leading-tight font-semibold">Product Description</h4>
						<p className="text-base text-gray-600 leading-normal">{`${demoProduct.description.substring(0, 100)}...`}</p>
					</div>
				</div>
				<br />
				<div className="max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-secondary">
					<div className=" pt-1">
						<h4 className="text-xl text-gray-900 font-semibold">Location</h4>
						<h3>
							Division:
							{' '}
							{demoProduct.address.division}
						</h3>
						<h3>
							District:
							{' '}
							{demoProduct.address.district}
						</h3>
						<h3>
							Details:
							{' '}
							{demoProduct.address.details}
						</h3>
					</div>
				</div>
				<br />
				<div className="max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-primary">
					<div className=" pt-1">
						<h4 className="text-xl text-gray-900 leading-tight font-semibold">Available Quantity</h4>
						<p className="text-base text-gray-600 leading-normal">
							{demoProduct.availableQuantity}
							{' '}
							pcs
							{' '}
						</p>
					</div>
				</div>
				<br />

				<br />
				<div className="flex-col
				space-y-3 max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-green-300 "
				>
					<h4 className="text-xl text-gray-900 font-semibold">Policies</h4>
					{demoProduct.rentingPolicies.map((property:RentingPolicy) => {
						if (demoProduct.rentingPolicies.indexOf(property) % 3 == 0) {
							return (
								<div
									key={property.id}
									className="flex-row border-2 border-solid rounded-xl
									hover:border-dotted border-indigo-500/100 p-2"
								>
									<div className=" ">
										<h2 className="font-mono font-bold italic text-rose-500">
											{property.title}
											{' '}
										</h2>
										<h3 className="font-semibold">
											{property.shortDescription}
										</h3>
									</div>
								</div>

							);
						} if (demoProduct.rentingPolicies.indexOf(property) % 3 == 1) {
							return (
								<div
									key={property.id}
									className="flex-row border-2 border-solid rounded-xl
									hover:border-dotted border-yellow-500 p-2"
								>
									<div className=" ">
										<h2 className="font-mono font-bold italic text-rose-500">
											{property.title}
											{' '}
										</h2>
										<h3 className="font-semibold">
											{property.shortDescription}
										</h3>
									</div>
								</div>

							);
						}

						return (
							<div
								key={property.id}
								className="flex-row border-2 border-solid rounded-xl
										hover:border-dotted border-purple-500 p-2"
							>
								<div className=" ">
									<h2 className="font-mono font-bold italic text-rose-500">
										{property.title}
										{' '}
									</h2>
									<h3 className="font-semibold">
										{property.shortDescription}
									</h3>
								</div>
							</div>
						);
					})}
				</div>
				<br />
				<br />
				<div className="flex-col
				space-y-3 max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-accent1 "
				>
					<h4 className="text-xl text-gray-900 font-semibold">Pricing Options</h4>
					{demoProduct.pricingPolicies.map((pricingScheme:PricingPolicy) => {
						if (demoProduct.pricingPolicies.indexOf(pricingScheme) % 3 == 0) {
							return (
								<div
									key={pricingScheme.id}
									className="flex-row border-2 border-solid rounded-xl
									hover:border-dotted border-indigo-500/100 p-2"
								>
									<div className=" ">
										<h3>
											BDT
											{' '}
											{pricingScheme.price}
											{' '}
											for
											{' '}
											{' '}
											{pricingScheme.duration.length}
											{pricingScheme.duration.unit}
										</h3>
									</div>
								</div>

							);
						} if (demoProduct.pricingPolicies.indexOf(pricingScheme) % 3 == 1) {
							return (
								<div
									key={pricingScheme.id}
									className="flex-row border-2 border-solid rounded-xl
									hover:border-dotted border-yellow-500 p-2"
								>
									<div className=" ">
										<h3>
											BDT
											{' '}
											{pricingScheme.price}
											{' '}
											for
											{' '}
											{' '}
											{pricingScheme.duration.length}
											{pricingScheme.duration.unit}
										</h3>
									</div>
								</div>

							);
						}

						return (
							<div
								key={pricingScheme.id}
								className="flex-row border-2 border-solid rounded-xl
										hover:border-dotted border-purple-500 p-2"
							>
								<div className=" ">
									<h3>
										BDT
										{' '}
										{pricingScheme.price}
										{' '}
										for
										{' '}
										{' '}
										{pricingScheme.duration.length}
										{pricingScheme.duration.unit}
									</h3>
								</div>
							</div>
						);
					})}
				</div>
				<br />
				<br />
				<br />
				<div className="self-center">
					<button
						type="button"
						className="bg-transparent self-center
					hover:bg-blue-500
						text-blue-700 font-semibold
							hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
					>
						<a href={`/rent/${demoProduct.id}`}> Place Rent Request </a>

					</button>
				</div>
				<div className="h-20 bg-transparent" />
			</div>
		</div>
	);
};

const ProductShowWithAuth = withAuth(ProductShow);

export { ProductShow, ProductShowWithAuth };
