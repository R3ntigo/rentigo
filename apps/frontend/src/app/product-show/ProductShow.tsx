import { useParams } from 'react-router-dom';
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

			<div>
				product Name
				<h1>{demoProduct.productName}</h1>
				desc
				<h2>{demoProduct.productDescription}</h2>
				div
				<h3>{demoProduct.productDivision}</h3>
				disct
				<h3>{demoProduct.productDistrict}</h3>
				upazilla
				<h3>{demoProduct.productUpazilla}</h3>
				quantity
				<h3>{demoProduct.quantity}</h3>

				<h3>{demoProduct.policy}</h3>
				properties
				{demoProduct.formFields.map((property) => (
					<div key={property.propertyID}>
						<h3>{property.propertyName}</h3>
						<h3>{property.propertyValue}</h3>
					</div>
				))}

				pricingScheme
				{demoProduct.formFields2.map((pricingScheme) => (
					<div key={pricingScheme.pricingSchemeID}>
						price
						<h3>{pricingScheme.price}</h3>
						day
						<h3>{pricingScheme.perday}</h3>
						exceeds
						<h3>{pricingScheme.exceeds}</h3>
						exceeds days
						<h3>{pricingScheme.exceedsDays}</h3>
						id
						<h3>{pricingScheme.pricingSchemeID}</h3>
					</div>
				))}
			</div>
		</div>
	);
};

export { ProductShow };
