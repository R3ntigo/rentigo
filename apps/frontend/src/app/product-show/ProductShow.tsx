import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

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
		<div>
			Product Show

			<div className="lg:w-4/5 mx-auto flex flex-wrap">
				<img
					alt="ecommerce"
					className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
					src=""
				/>
				<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
					<h2 className="text-sm title-font text-gray-500 tracking-widest">Owner Name</h2>
					<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{demoProduct.productName}</h1>
					<br />
					<p className="break-all leading-relaxed">
						{demoProduct.productDescription}
					</p>
					<div className="max-w-sm flex p-6 bg-white rounded-lg shadow-xl">
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
					<h3>
						Quantity :
						{' '}
						{demoProduct.quantity}
					</h3>

					<br />
					<div className="container max-w-sm p-6 space-y-2 bg-white rounded-lg shadow-xl">
						<h4 className="text-xl text-gray-900">Features</h4>
						{demoProduct.formFields.map((property) => (
							<div
								key={property.propertyID}
								className="container ml-6 pt-1 border-2 border-dotted
									hover:border-solid border-indigo-500/100 "
							>
								<h3>
									{property.propertyName}
									{' '}
									:
									{' '}
									{property.propertyValue}
								</h3>
							</div>

						))}
					</div>
					<br />
					<div className="container max-w-sm p-6 space-y-2 bg-white rounded-lg shadow-xl">
						<h4 className="text-xl text-gray-900">Pricing Options</h4>
						{demoProduct.formFields2.map((priceScheme) => (
							<div
								key={priceScheme.pricingSchemeID}
								className="container ml-6 pt-1 border-2 border-dotted
									hover:border-solid border-green-500/100 "
							>
								<h3>
									BDT
									{' '}
									{priceScheme.price}
									{' '}
									for
									{' '}
									{' '}
									{priceScheme.perday ? 'each day' : `if exceeds ${priceScheme.exceedsDays}` }
								</h3>
							</div>

						))}
					</div>
					<br />
					<div className="max-w-sm flex p-6 bg-white rounded-lg shadow-xl">
						<div className="ml-6 pt-1">
							<h4 className="text-xl text-gray-900">Policies</h4>
							<h6>{demoProduct.policy}</h6>
						</div>
					</div>
				</div>
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
			</div>

		</div>
	);
};

export { ProductShow };
