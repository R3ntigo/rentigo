import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
import { Product, PricingPolicy, RentingPolicy, Request } from '@rentigo/models';
import Select from 'react-select';
import { TimeUnit } from '@rentigo/constants';
import axios from 'axios';
import { withAuth } from '../auth/withAuth';

const ProductRentReq = () => {
	interface Options {
		value: string;
		label: string;
	}
	const [demoProduct, setInitialProductState] = useState<Product>();
	const [quantity2, setQuantity] = useState('1');
	const [timeUnitOptions, setTimeUnitOptions] = useState([] as Options[]);
	// const [rentReq, setRentReq] = useState<Request>();
	const { id } = useParams();
	useEffect(() => {
		fetchProduct();
		getDurationOptions();
		console.log(demoProduct);
	}, []);
	async function getDurationOptions() {
		// use TimeUnit enum to populate select options
		const temp: Options[] = [];
		Object.keys(TimeUnit).forEach((key) => {
			temp.push({ value: key, label: key });
		});
		setTimeUnitOptions(temp);
	}
	async function fetchProduct() {
		const response = await fetch(`/api/product/${id}`);
		const data = await response.json();
		console.log(data);
		setInitialProductState(data);
	}
	if (!demoProduct) return (<div>Loading...</div>);
	const rentReq = {
		product: id,
		quantity: parseInt(quantity2, 10),
		address: demoProduct.address.id,
		duration: {
			unit: 'ee',
			length: 2
		}

	};
	const handleSubmit = () => {
		console.log(rentReq);

		axios.post('/api/request', rentReq).then((res) => {
			console.log(res);
			if (res.status === 201) {
				alert('Request sent successfully');
			} else {
				alert('Request failed');
			}
		});
	};

	const decreaseQuantity = () => {
		// get integer value of quantity
		let { quantity } = rentReq;
		if (quantity > 0) {
			quantity -= 1;
		}
		rentReq.quantity = quantity;
		setQuantity(quantity.toString());
	};

	const increaseQuantity = () => {
		let { quantity } = rentReq;
		console.log(quantity);
		if (quantity < demoProduct.availableQuantity) {
			quantity += 1;
			rentReq.quantity = quantity;
			setQuantity(quantity.toString());
		}
	};

	const calculatePaisa = () => -4;
	return (
		<>
			<div className="absolute top-6 w-full text-center">
				<h1 className="text-2xl font-semibold">
					Rent req for
					{' '}
					{demoProduct.title}
				</h1>
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
			<div className="p-7 space-y-4 grid place-items-center">
				<img
					src={`${demoProduct.imageUrls[0].url}`}
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
							 flex items-center rounded-2xl border-2 border-rose-500 border-dashed"
						>
							<div className="p-3 font-semibold font">
								{demoProduct.address.details}
								,
								{' '}
								{' '}
								,
								{demoProduct.address.district}
								{' '}
								{' '}
								,
								{demoProduct.address.division}
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
								value={quantity2}
								onChange={
									(e) => {
										setQuantity(e.target.value);
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
								rentReq.duration.length = parseInt(e.target.value, 10);
							}}
						/>
						<br />
						TIME UNIT
						<Select
							id="timeUnit"
							className=""
							options={timeUnitOptions}
							defaultValue={{
								value: '',
								label: 'Select an option',
							}}
							onChange={(e) => {
								if (e != null) {
									rentReq.duration.unit = e.value;
								}
							}}
							name="rentingDurationUnit"
						/>
					</div>
					<br />

					{/* <div>
						<button type="button" onClick={calculatePaisa}> Calculate Fare </button>
					</div>

					<div><h1>{calculatePaisa()}</h1></div> */}

					<div>
						<button
							type="button"
							onClick={handleSubmit}
							className="bg-transparent hover:bg-[#f59e0b] text-[#f59e0b] font-semibold
						hover:text-white py-2 px-4 border border-[#f59e0b] hover:border-transparent rounded"
						>
							Send request to
							{' '}
							{demoProduct.lender.firstName}
						</button>
					</div>

				</div>
				<br />
				<br />
				<br />
			</div>
		</>
	);
};
const ProductRentReqWithAuth = withAuth(ProductRentReq);

export { ProductRentReq, ProductRentReqWithAuth };
