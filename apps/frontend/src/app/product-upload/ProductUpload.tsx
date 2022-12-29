/* eslint-disable react/jsx-key */
/* eslint-disable no-return-assign */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import { FaUpload } from 'react-icons/fa';
import { IoIosRemoveCircle	} from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import { MdSystemUpdateAlt, MdOutlineRemoveCircle } from 'react-icons/md';
import { BsPlusSquareFill } from 'react-icons/bs';
import { Address, RentingPolicy, Duration } from '@rentigo/models';
import { TimeUnit } from '@rentigo/constants';
import { withAuth } from '../auth/withAuth';

const ProductUpload = () => {
	interface Options {
		value: string;
		label: string;
	}
	interface Division {
		_id: string;
		name: string;
	}
	interface District {
		_id: string;
		district: string;
		coordinates?: string;
		upazilla?: string[];
	}
	interface Tags {
		tag: string;
		tagID: number;
	}
	const fistProperty : Tags[] = [{
		tag: '',
		tagID: 0,
	}];
	interface PricingScheme {
		price: string;
		perday: boolean;
		exceeds: boolean;
		exceedsDays: string;
		pricingSchemeID: number;
		timeUnit: string;

	}
	const firstPricingScheme : PricingScheme[] = [{
		price: '',
		perday: true,
		exceeds: false,
		exceedsDays: '',
		pricingSchemeID: 0,
		timeUnit: TimeUnit.DAY
	}];
	interface RentingPolicyTransfer {
		id: number;
		rentingPolicyID: string;
	}
	const firstRentingPolicy : RentingPolicyTransfer[] = [{
		id: 0,
		rentingPolicyID: '',
	}];

	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [divisionOptions, setDivisionOptions] = useState([] as Options[]);
	const [productDivision, setProductDivision] = useState('');
	const [districtOptions, setDistrictOptions] = useState([] as Options[]);
	const [upazillaOptions, setUpazillaOptions] = useState([] as Options[]);
	const [addressKey, setAddress] = useState('');
	const [productUpazilla, setProductUpazilla] = useState('');
	const [formFields, setFormFields] = useState(fistProperty);
	const [policy, setPolicy] = useState('');
	const [images, setImages] = useState([] as any[]);
	const [formFields2, setFormFields2] = useState(firstPricingScheme);
	const [formFields3, setFormFields3] = useState(firstRentingPolicy);
	const [quantity, setQuantity] = useState('');
	const [userAddress, setUserAddresses] = useState([] as Options[]);
	const [rentingPolicies, setRentingPolicies] = useState([] as Options[]);
	const [timeUnitOptions, setTimeUnitOptions] = useState([] as Options[]);
	const maxNumber = 10;

	const onChange = (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		// data for submit
		// console.log(imageList, addUpdateIndex);
		setImages(imageList as never[]);
	};
	const handleSubmit = async () => {
		// const userID = decodeduser.id;
		// console.log("lol" + restaurantID);
		// const newProduct = {
		// 	title: productName,
		// 	description: productDescription,
		// 	address: addressKey,
		// 	rentingPolicies: formFields3.map((field) => field.rentingPolicyID),
		// 	pricingPolicies: formFields2.map((field) => ({
		// 		price: field.price,
		// 		duration: {
		// 			unit: field.timeUnit,
		// 			length: field.exceedsDays
		// 		}
		// 	})),
		// 	tags: formFields.map((field) => field.tag),
		// 	imageUrls: images,
		// 	totalQuantity: quantity
		// };
		// console.log(newProduct);
		// axios.post('/api/product', newProduct).then((res) => {
		// 	console.log(res);
		// 	console.log(res.data);
		// });
		// send a multipart form data post request using axios
		const formData = new FormData();
		formData.append('title', productName);
		formData.append('description', productDescription);
		formData.append('address', addressKey);
		formData.append(
			'rentingPolicies',
			formFields3.map((field) => field.rentingPolicyID).join(',')
		);
		formData.append(
			'pricingPolicies',
			formFields2.map((field) => (JSON.stringify({
				price: Number(field.price),
				duration: {
					unit: field.timeUnit,
					length: Number(field.exceedsDays),
				},
			}))).join(',')
		);
		formData.append(
			'tags',
			formFields.map((field) => field.tag).join(',')
		);
		formData.append('totalQuantity', quantity);
		images.forEach((image) => {
			formData.append('imageUrls', image.file);
		});
		axios.post('/api/product', formData).then((res) => {
			console.log(res);
			// alert the user that the product has been added
			if (res.status === 201) {
				alert('Product added successfully');
			} else {
				alert('Product could not be added');
			}
		});
	};
	async function getDivisionOptions() {
		const { data } = await axios.get(
			`https://bdapis.com/api/v1.1/divisions`
		);
		// console.log(data);
		if (data.status.message === 'ok') {
			const divisions = data.data.map((division: Division) => ({
				// eslint-disable-next-line no-underscore-dangle
				value: division._id,
				label: division.name,
			}));
			setDivisionOptions(divisions);
			// console.log(`ere ${divisionOptions}`);
		} else {
			// console.log('Division fetching api failed');
		}
	}
	useEffect(() => {
		getDivisionOptions();
		getUserAddresses();
		getUserRentingPolicy();
		getDurationOptions();
	}, []);
	async function getDistrictOptions(value: string) {
		const { data } = await axios.get(
			`https://bdapis.com/api/v1.1/division/${value}`
		);
		// console.log(data);
		if (data.status.message === 'ok') {
			const districts = data.data.map((district: District) => ({
				// eslint-disable-next-line no-underscore-dangle
				value: district._id,
				label: district.district,
			}));
			setDistrictOptions(districts);
		} else {
			console.log('District fetching api failed');
		}
	}

	// async function getUpazillaOptions(value: string) {
	// 	// console.log(value);
	// 	const { data } = await axios.get(
	// 		`https://bdapis.herokuapp.com/api/v1.1/division/${value}`
	// 	);
	// 	// console.log(data);

	// 	if (data.status.message === 'ok') {
	// 		const upazillas = data.data.filter(
	// 			(upazilla: Upazilla) => upazilla.district === productDistrict
	// 		);
	// 		// console.log(upazillas.upazilla);
	// 		setUpazillaOptions(upazillas.upazilla);
	// 	} else {
	// 		console.log('District fetching api failed');
	// 	}
	// }

	// async function getUpazillaOptions2(value: string) {
	// 	// console.log(value);
	// 	const { data } = await axios.get(
	// 		`https://bdapis.com/api/v1.1/division/${value}`
	// 	);
	// 	// console.log(data);
	// 	let tempStringArray: string[] = [];
	// 	const temp2: Options[] = [];
	// 	if (data.status.message === 'ok') {
	// 		// console.log(data.data);
	// 		data.data.forEach((e: District) => {
	// 			// console.log(productDistrict);
	// 			// console.log(e.district);
	// 			// console.log(e.upazilla);
	// 			if (e.district.toUpperCase === productDistrict.toUpperCase) {
	// 				// console.log(e.upazilla);
	// 				tempStringArray = e.upazilla as string[];
	// 			}
	// 		});
	// 		// console.log(tempStringArray);
	// 		tempStringArray.forEach((e) => {
	// 			temp2.push({ value: e, label: e });
	// 		});
	// 		setUpazillaOptions(temp2);
	// 		// console.log(temp2);
	// 	}
	// }
	const addFields = () => {
		setFormFields([...formFields, { tag: '', tagID: formFields.length }]);
	};
	const removeFields = (index: number) => {
		const values = [...formFields];
		if (values.length === 1) {
			return;
		}
		values.splice(index, 1);
		setFormFields(values);
	};
	const addFields2 = () => {
		setFormFields2([...formFields2,
			{ 	price: '',
				perday: true,
				exceeds: false,
				exceedsDays: '',
				pricingSchemeID: formFields2.length,
				timeUnit: TimeUnit.DAY }]);
	};
	const removeFields2 = (index: number) => {
		const values = [...formFields2];
		if (values.length === 1) {
			return;
		}
		values.splice(index, 1);
		setFormFields2(values);
	};
	const addFields3 = () => {
		setFormFields3([...formFields3, { rentingPolicyID: '', id: formFields3.length }]);
	};
	const removeFields3 = (index: number) => {
		const values = [...formFields3];
		if (values.length === 1) {
			return;
		}
		values.splice(index, 1);
		setFormFields3(values);
	};
	// const fileHandler = (e: any) => {
	//   console.log(e.target.files);
	//   setProductPicUpload(e.target.files);
	//   console.log(`productpic${productPicUpload}`);
	// };
	async function getUserAddresses() {
		const { data } = await axios.get(
			`/api/users/addresses`
		);
		console.log(data);

		const addresses = data.map((address: Address) => ({
			// eslint-disable-next-line no-underscore-dangle
			value: address.id,
			label: `${address.division}, ${address.district}, ${address.details}`
		}));
		setUserAddresses(addresses);
		console.log(addresses);
		return addresses;
	}
	async function getUserRentingPolicy() {
		const { data } = await axios.get(
			`/api/users/rentingPolicy`
		);
		console.log(data);

		const urentingPolicies = data.map((rentingPolicy: RentingPolicy) => ({
			// eslint-disable-next-line no-underscore-dangle
			value: rentingPolicy.id,
			label: `${rentingPolicy.title}, ${rentingPolicy.shortDescription}`
		}));
		setRentingPolicies(urentingPolicies);
		console.log(rentingPolicies);
		return rentingPolicies;
	}
	async function getDurationOptions() {
		// use TimeUnit enum to populate select options
		const temp: Options[] = [];
		Object.keys(TimeUnit).forEach((key) => {
			temp.push({ value: key, label: key });
		});
		setTimeUnitOptions(temp);
	}
	return (
		<>
			<div className="absolute top-6 left-14 text-center">
				<h1 className="text-2xl font-semibold">Add Your Product to rent</h1>
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
			<div className=" mx-auto  rounded justify-center ">
				<div className="bg-blue w-400 py-8 px-6 shadow rounded-lg sm:px-10 font-semibold text-lg ">
					<div className="">
						<label htmlFor="name" className="text-lg">
							Product Name
							<input
								id="productName"
								className="shadow appearance-none
									border rounded w-full py-2 px-3 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
								type="text"
								onChange={(e) => setProductName(e.target.value)}
							/>
						</label>
					</div>
					<label htmlFor="productDescription">
						Product Description
						<textarea
							id="productDescription"
							className="shadow appearance-none
									border rounded w-full py-2 px-3 h-16 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
							onChange={(e) => setProductDescription(e.target.value)}
						/>
					</label>
					<span className="inline">
						<label htmlFor="productPicUpload">

							Product Picture

							<ImageUploading
								multiple
								value={images}
								onChange={onChange}
								maxNumber={maxNumber}
							>
								{({
									imageList,
									onImageUpload,
									onImageRemoveAll,
									onImageUpdate,
									onImageRemove,
									isDragging,
									dragProps
								}) => (
								// write your building UI
									<div className="flex grid grid-cols-2">
										<div>
											<button
												type="button"
												className="border border-[#db2777] rounded-md px-3 py-2 align-middle"
												style={isDragging ? { color: 'red' } : undefined}
												onClick={onImageUpload}
												// eslint-disable-next-line react/jsx-props-no-spreading
												{...dragProps}
											>
												<FaUpload size="34" />
											</button>
										</div>
										{/* &nbsp	 */}
										<div>
											<button
												type="button"
												className="border border-[#db2777] rounded-md px-3 py-2 align-middle"
												onClick={onImageRemoveAll}
											>
												<IoIosRemoveCircle size="34" />
											</button>
										</div>
										<div className="p-4">
											<div
												className="border-dashed border-2
													border-[#f59e0b] w-80 rounded-2xl p-2 flex mb-4"
											>
												{imageList.length == 0
						&& (
							<div className=" flex flex-col
                    items-center justify-center align-middle"
							>
								<p className="mt-2 text-sm text-red-600 dark:text-red-500 animate-pulse ">
									No image uploaded. Highest count 10
								</p>
							</div>

						)}
												<div className="container grid grid-cols-3 gap-2 mx-auto">
													{imageList.map((image, index) => (
														// eslint-disable-next-line react/no-array-index-key
														<div key={index} className="w-full rounded ">
															<img src={image.dataURL} alt="" width="100" />
															<div className="border-spacing-2">
																<button
																	type="button"
																	className="border
																	border-[#db2777] rounded-md px-2 py-2 align-middle"
																	onClick={() => onImageUpdate(index)}
																>
																	<MdSystemUpdateAlt size="24" />
																</button>
																<button
																	type="button"
																	className="border
																	border-[#db2777] rounded-md px-2 py-2 align-middle"
																	onClick={() => onImageRemove(index)}
																>
																	<ImCross size="25" />
																</button>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								)}
							</ImageUploading>

						</label>
					</span>

					Choose an address
					<Select
						id="address"
						className=""
						options={userAddress}
						defaultValue={{
							value: '',
							label: 'Select an option',
						}}
						onChange={(e) => {
							if (e != null) {
								setAddress(e.value);
							}
						}}
						name="address"
					/>
					<br />
					<div className="border-dashed border-2 border-[#c60bf5] rounded-2xl p-2 ">
						Choose a Renting Policy
						{
							formFields3.map((item) => (
								<div key={item.id}>
									<Select
										id="rentingPolicy"
										className=""
										options={rentingPolicies}
										defaultValue={{
											value: '',
											label: 'Select an option',
										}}
										onChange={(e) => {
											if (e != null) {
												formFields3[item.id].rentingPolicyID = e.value;
											}
										}}
										name="rentingPolicy"
									/>
									<div className="grid grid-cols-2 gap-1">
										<div className="flex items-center align-middle justify-center">
											<div className="">
												<button type="button" onClick={addFields3}>
													{' '}
													<BsPlusSquareFill size="24" />
													{' '}
												</button>
											</div>
										</div>
										<div className="flex items-center align-middle justify-center">
											<div className="">
												<button type="button" onClick={() => removeFields3(item.id)}>
													<MdOutlineRemoveCircle size="29" />
												</button>
											</div>
										</div>
									</div>
								</div>

							))
						}
					</div>
					<br />
					<div className="border-dashed border-2 border-[#0bdaf5] rounded-2xl p-2 ">
						Add Tags
						{
							formFields.map((element) => (
								<div key={element.tagID} className="">
									<div className="">
										<input
											type="text"
											placeholder="Add one Tag per box"
											className="shadow appearance-none
										border rounded w-full py-2 px-3 text-[#db2777]
											leading-tight focus:outline-[#10b981]"
											// eslint-disable-next-line no-return-assign
											onChange={
												// eslint-disable-next-line no-return-assign
												(e) => formFields[element.tagID].tag = e.target.value
											}
										/>
									</div>
									<div className="grid grid-cols-2 gap-1">
										<div className="flex items-center align-middle justify-center">
											<div className="">
												<button type="button" onClick={addFields}>
													{' '}
													<BsPlusSquareFill size="24" />
													{' '}
												</button>
											</div>
										</div>
										<div className="flex items-center align-middle justify-center">
											<div className="">
												<button type="button" onClick={() => removeFields(element.tagID)}>
													<MdOutlineRemoveCircle size="29" />
												</button>
											</div>
										</div>
									</div>
								</div>

							))
						}
					</div>
					<br />
					<div className="border-dashed border-2 border-[#f59e0b] rounded-2xl p-2 ">
						{
							formFields2.map((element) => (
								<div key={element.pricingSchemeID}>
									BDT
									<input
										type="number"
										placeholder="Charge"
										className="shadow appearance-none
										border rounded w-full py-2 px-3 text-[#db2777]
											leading-tight focus:outline-[#10b981]"
										onChange={(e) => {
											formFields2[element.pricingSchemeID].price = e.target.value;
										}}
									/>

									for
									<input
										placeholder="Exceeding days"
										type="number"
										className="shadow appearance-none
										border rounded w-full py-2 px-3 text-[#db2777]
											leading-tight focus:outline-[#10b981]"
										onChange={(e) => {
											formFields2[element.pricingSchemeID].exceedsDays = e.target.value;
										}}
									/>
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
												formFields2[element.pricingSchemeID].timeUnit = e.value;
											}
										}}
										name="rentingPolicy"
									/>
									<div className="grid grid-cols-2 gap-1">
										<div className="flex items-center align-middle justify-center">
											<div className="">
												<button type="button" onClick={addFields2}>
													{' '}
													<BsPlusSquareFill size="24" />
													{' '}
												</button>
											</div>
										</div>
										<div className="flex items-center align-middle justify-center">
											<div className="">
												<button
													type="button"
													onClick={() => removeFields2(element.pricingSchemeID)}
												>
													<MdOutlineRemoveCircle size="29" />
												</button>
											</div>
										</div>
									</div>
								</div>

							))
						}
					</div>
					Quantity
					<input
						className="shadow appearance-none
										border rounded w-full py-2 px-3 text-[#db2777]
											leading-tight focus:outline-[#10b981]"
						type="number"
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<input type="submit" value="Submit" onClick={handleSubmit} />
					<br />
					<br />
					<br />

				</div>
			</div>
		</>
	);
};

const ProductUploadWithAuth = withAuth(ProductUpload);

export { ProductUpload, ProductUploadWithAuth };
