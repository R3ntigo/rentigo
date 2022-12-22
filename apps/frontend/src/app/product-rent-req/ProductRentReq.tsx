import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
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
		rentTakerID: '', // get from token
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
				pricingSchemeID: 2
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
		<>
			<div className="absolute top-6 w-full text-center">
				<h1 className="text-2xl font-semibold">Rent req for product X</h1>
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
			<div className="p-7 space-y-4">
				<img
					src="E:\dp1\production-Rentingo\rentigo\apps\frontend\src\app\product-show\ll.jpg"
					alt="ecommerce"
					className="lg:w-1/2 object-cover object-center rounded border border-gray-200"
				/>
				<div>
					<div className="max-w-sm
						p-4 space-y-3 bg-slate-200 rounded-lg shadow-lg border-4 border-purple-400"
					>
						<h2>
							The location you will be going to pick up the product
						</h2>
						<div className="bg-white
							h-10 flex items-center rounded-2xl border-2 border-rose-500 border-dashed"
						>
							<div className="p-3 font-semibold font">
								{demoProduct.productUpazilla}
								,
								{' '}
								{' '}
								,
								{demoProduct.productDistrict}
								{' '}
								{' '}
								,
								{demoProduct.productDivision}
							</div>
						</div>
					</div>
					<br />
					<div className="max-w-sm
						p-4 space-y-3 bg-slate-200 rounded-lg shadow-lg border-4 border-purple-400"
					>
						<span>
							<button
								type="button"
								className=" bg-rose-400 rounded-md px-3 py-2 align-middle mr-12 ml-1"
								onClick={decreaseQuantity}
							>
								<BsCaretDown size="30" />
							</button>
							<input
								type="text"
								className="shadow appearance-none bg-white
									border rounded-2xl w-20 py-2 px-3 text-[#db2777]
										leading-tight focus:outline-[#10b981] text-center"
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
							<button
								type="button"
								className=" bg-green-300 rounded-md px-3 py-2 align-middle ml-12"
								onClick={increaseQuantity}
							>
								<BsCaretUp size="30" />
							</button>
						</span>
					</div>
					<br />
					<div className="max-w-sm
						p-4 space-y-3 bg-slate-200 rounded-lg shadow-lg border-4 border-purple-400"
					>
						Enter time for rent in days
						<br />
						<input
							placeholder="Input days of rent"
							className="shadow appearance-none
									border rounded w-full py-2 px-3 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
							onChange={(e) => {
								setRentReq({
									...rentReq,
									numOfReqDays: parseInt(e.target.value, 10)
								});
							}}
						/>
					</div>
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
		</>
	);
};

export { ProductRentReq };
