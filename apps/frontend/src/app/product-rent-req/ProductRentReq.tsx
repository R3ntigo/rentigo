import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';

const ProductRentReq = () => {
	const [initialProductState, setInitialProductState] = useState([]);

	const { id } = useParams();
	// useEffect(() => {
	// 	fetch(`/rentReq/${id}`).then((res) => res.json()).then((jsonResponse) => setInitialProductState(jsonResponse));
	// }, []);

	interface RentReq {
		rentTakerID: string; // get from token
		rentTakerName: string; // get from token
		productID: string; // get from url
		quantity: number;
		rentReqtDate: string;
		numOfReqDays: number;
		projectedTotal: number; // get from backend
	}

	const [rentReq, setRentReq] = useState<RentReq>({
		rentTakerID: '',
		rentTakerName: '',
		productID: '',
		quantity: 0,
		rentReqtDate: Date(),
		numOfReqDays: 0,
		projectedTotal: 0,
	});

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
			},
			{
				price: '10',
				perday: false,
				exceeds: true,
				exceedsDays: '18',
				pricingSchemeID: 1
			}
		],
		policy: 'hello do not do any harm',
		images: [],
		quantity: '12'
	};
	useEffect(() => {

	}, [rentReq]);
	const decreaseQuantity = () => {
		let { quantity } = rentReq;
		if (quantity > 0) {
			quantity -= 1;
		}
		setRentReq({ ...rentReq, quantity });
	};

	const increaseQuantity = () => {
		let { quantity } = rentReq;
		if (quantity < parseInt(demoProduct.quantity, 10)) {
			quantity += 1;
			setRentReq({ ...rentReq, quantity });
		}
	};

	const calculatePaisa = () => {
		const total : number[] = [0];
		let exceedsTotal : number;
		exceedsTotal = 0;
		let currentExceedday : number;
		currentExceedday = 0;
		demoProduct.formFields2.forEach((element) => {
			if (element.exceeds) {
				if (rentReq.numOfReqDays > parseInt(element.exceedsDays, 10)
				&& currentExceedday < rentReq.numOfReqDays) {
					exceedsTotal = rentReq.numOfReqDays * parseInt(element.price, 10);
					currentExceedday = parseInt(element.exceedsDays, 10);
				}
			} else {
				total.push(rentReq.numOfReqDays * parseInt(element.price, 10));
				console.log(total);
			}
		});
		const x = total[total.length - 1];
		if (exceedsTotal) {
			return exceedsTotal;
		}
		if (x) {
			return x;
		}
		return 0;
	};

	return (
		<div>
			<h1>Product Rent Request</h1>
			<div>
				<h2>
					Product Name:
					{demoProduct.productName}

				</h2>
				<h2>
					Product Description:
					{demoProduct.productDescription}
				</h2>
				<h2>
					Product location:
				</h2>
				<span>
					<button type="button" onClick={decreaseQuantity}> dec </button>
					<input
						type="text"
						value={rentReq.quantity}
						onChange={
							(e) => {
								setRentReq({
									...rentReq,
									quantity: parseInt(e.target.value, 10)
								});
								console.log(rentReq);
							}
						}
						disabled
					/>
					<button type="button" onClick={increaseQuantity}> Add </button>
				</span>
				<input
					placeholder="Input days of rent"
					onChange={(e) => {
						setRentReq({
							...rentReq,
							numOfReqDays: parseInt(e.target.value, 10)
						});
					}}
				/>

				<div>
					<h2>Recap the policies</h2>
					<p>
						{demoProduct.policy}
					</p>
				</div>

				<div>
					<button type="button" onClick={calculatePaisa}> Calculate Fare </button>
				</div>

				<div><h1>{calculatePaisa()}</h1></div>

				<div>
					<button type="button">
						Send request to Sakib
					</button>
				</div>

			</div>
		</div>
	);
};

export { ProductRentReq };
