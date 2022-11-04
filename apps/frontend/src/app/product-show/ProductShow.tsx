import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { withAuth } from '../auth/withAuth';

const ProductShow = () => {
	const { id } = useParams();
	const [initialProductState, setInitialProductState] = useState([]);

	// useEffect(() => {
	// 	fetch(`/post/${id}`).then((res) => res.json()).then((jsonResponse) => setInitialProductState(jsonResponse));
	// }, []);
	interface Property {
		propertyName: string;
		propertyValue: string;
		propertyID: number;
	}

	interface PricingScheme {
		price: string;
		perday: boolean;
		exceeds: boolean;
		exceedsDays: string;
		pricingSchemeID: number;

	}
	interface Product {
		productName : string,
		productDescription : string,
		productDivision : string,
		productDistrict : string,
		productUpazilla : string,
		formFields : Property[],
		formFields2 : PricingScheme[],
		policy : string,
		images : ImageListType[],
		quantity : string
	}
	const demoProduct : Product = {
		productName: 'demo',
		productDescription: 'demo description',
		productDivision: 'dhaka',
		productDistrict: 'gazipur',
		productUpazilla: 'Ghatail',
		formFields: [
			{
				propertyName: 'demo property 1',
				propertyValue: 'demo vlue 1',
				propertyID: 0
			},
			{
				propertyName: 'prop 2',
				propertyValue: 'value 2',
				propertyID: 1
			}
		],
		formFields2: [
			{
				price: '12',
				perday: false,
				exceeds: true,
				exceedsDays: '12',
				pricingSchemeID: 0
			},
			{
				price: '21',
				perday: true,
				exceeds: false,
				exceedsDays: '',
				pricingSchemeID: 1
			}
		],
		policy: 'hello do not do any harm',
		images: [],
		quantity: '12'
	};

	// const demoProduct : Product = {

	// };

	return (
		<div className=" mx-auto  rounded justify-center ">
			<img
				src="E:\dp1\production-Rentingo\rentigo\apps\frontend\src\app\product-show\ll.jpg"
				alt="ecommerce"
				className="lg:w-1/2   object-cover object-center rounded border border-gray-200"

			/>

			<div className="mx-auto p-6 rounded justify-center">
				<h2 className="text-sm title-font text-gray-500 tracking-widest">Owner Name</h2>
				<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{demoProduct.productName}</h1>
				<br />
				<div className="max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-pink-300">
					<div className="ml-6 pt-1">
						<h4 className="text-xl text-gray-900 leading-tight">Product Description</h4>
						<p className="text-base text-gray-600 leading-normal">{demoProduct.productDescription}</p>
					</div>
				</div>
				<br />
				<div className="max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-yellow-300">
					<div className="ml-6 pt-1">
						<h4 className="text-xl text-gray-900">Location</h4>
						<h3>
							Division:
							{' '}
							{demoProduct.productDivision}
						</h3>
						<h3>
							District:
							{' '}
							{demoProduct.productDistrict}
						</h3>
						<h3>
							Upazilla:
							{' '}
							{demoProduct.productUpazilla}
						</h3>
					</div>
				</div>
				<br />
				<div className="max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-purple-300">
					<div className="ml-6 pt-1">
						<h4 className="text-xl text-gray-900 leading-tight">Available Quantity</h4>
						<p className="text-base text-gray-600 leading-normal">
							{demoProduct.quantity}
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
					<h4 className="text-xl text-gray-900">Features</h4>
					{demoProduct.formFields.map((property) => {
						if (property.propertyID % 3 == 0) {
							return (
								<div
									key={property.propertyID}
									className="flex-row border-2 border-solid rounded-xl
									hover:border-dotted border-indigo-500/100 p-2"
								>
									<div className=" ">
										<h3>
											{property.propertyName}
											{' '}
											:
											{' '}
											{property.propertyValue}
										</h3>
									</div>
								</div>

							);
						} if (property.propertyID % 3 == 1) {
							return (
								<div
									key={property.propertyID}
									className="flex-row border-2 border-solid rounded-xl
									hover:border-dotted border-yellow-500 p-2"
								>
									<div className=" ">
										<h3>
											{property.propertyName}
											{' '}
											:
											{' '}
											{property.propertyValue}
										</h3>
									</div>
								</div>

							);
						}

						return (
							<div
								key={property.propertyID}
								className="flex-row border-2 border-solid rounded-xl
										hover:border-dotted border-purple-500 p-2"
							>
								<div className=" ">
									<h3>
										{property.propertyName}
										{' '}
										:
										{' '}
										{property.propertyValue}
									</h3>
								</div>
							</div>
						);
					})}
				</div>
				<br />
				<br />
				<div className="flex-col
				space-y-3 max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-pink-300 "
				>
					<h4 className="text-xl text-gray-900">Pricing Options</h4>
					{demoProduct.formFields2.map((pricingScheme) => {
						if (pricingScheme.pricingSchemeID % 3 == 0) {
							return (
								<div
									key={pricingScheme.pricingSchemeID}
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
											{pricingScheme.perday
												? 'each day' : `if exceeds ${pricingScheme.exceedsDays}` }
										</h3>
									</div>
								</div>

							);
						} if (pricingScheme.pricingSchemeID % 3 == 1) {
							return (
								<div
									key={pricingScheme.pricingSchemeID}
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
											{pricingScheme.perday
												? 'each day' : `if exceeds ${pricingScheme.exceedsDays}` }
										</h3>
									</div>
								</div>

							);
						}

						return (
							<div
								key={pricingScheme.pricingSchemeID}
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
										{pricingScheme.perday ? 'each day' : `if exceeds ${pricingScheme.exceedsDays}` }
									</h3>

								</div>
							</div>
						);
					})}
				</div>
				<br />
				<br />
				<div className="max-w-sm flex p-4 bg-slate-100 rounded-lg shadow-lg shadow-purple-300">
					<div className="ml-6 pt-1">
						<h4 className="text-xl text-gray-900 leading-tight">Policy</h4>
						<p className="text-base text-gray-600 leading-normal">
							{demoProduct.policy}
						</p>
					</div>
				</div>
				<br />
				<div className="self-center">
					<button
						type="button"
						className="bg-transparent self-center
					hover:bg-blue-500
						text-blue-700 font-semibold
							hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
					>
						<Link to="/rent/123"> Place Rent Request </Link>

					</button>
				</div>
				<div className="h-20 bg-transparent" />
			</div>
		</div>
	);
};

const ProductShowWithAuth = withAuth(ProductShow);

export { ProductShow, ProductShowWithAuth };
