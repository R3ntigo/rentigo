/* eslint-disable no-return-assign */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { FaUpload } from 'react-icons/fa';
import { IoIosRemoveCircle	} from 'react-icons/io';
import { ImCross } from 'react-icons/im';
import { MdSystemUpdateAlt, MdOutlineRemoveCircle } from 'react-icons/md';
import { BsPlusSquareFill } from 'react-icons/bs';
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
	interface Property {
		propertyName: string;
		propertyValue: string;
		propertyID: number;
	}
	const fistProperty : Property[] = [{
		propertyName: '',
		propertyValue: '',
		propertyID: 0,
	}];
	interface PricingScheme {
		price: string;
		perday: boolean;
		exceeds: boolean;
		exceedsDays: string;
		pricingSchemeID: number;

	}
	const firstPricingScheme : PricingScheme[] = [{
		price: '',
		perday: true,
		exceeds: false,
		exceedsDays: '',
		pricingSchemeID: 0,
	}];

	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [divisionOptions, setDivisionOptions] = useState([] as Options[]);
	const [productDivision, setProductDivision] = useState('');
	const [districtOptions, setDistrictOptions] = useState([] as Options[]);
	const [upazillaOptions, setUpazillaOptions] = useState([] as Options[]);
	const [productDistrict, setProductDistrict] = useState('');
	const [productUpazilla, setProductUpazilla] = useState('');
	const [formFields, setFormFields] = useState(fistProperty);
	const [policy, setPolicy] = useState('');
	const [images, setImages] = useState([]);
	const [formFields2, setFormFields2] = useState(firstPricingScheme);
	const [quantity, setQuantity] = useState('');
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
		const newProduct = {
			productName,
			productDescription,
			productDivision,
			productDistrict,
			productUpazilla,
			formFields,
			formFields2,
			policy,
			images,
			quantity
		};
		// console.log(newProduct);
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

	async function getUpazillaOptions2(value: string) {
		// console.log(value);
		const { data } = await axios.get(
			`https://bdapis.com/api/v1.1/division/${value}`
		);
		// console.log(data);
		let tempStringArray: string[] = [];
		const temp2: Options[] = [];
		if (data.status.message === 'ok') {
			// console.log(data.data);
			data.data.forEach((e: District) => {
				// console.log(productDistrict);
				// console.log(e.district);
				// console.log(e.upazilla);
				if (e.district.toUpperCase === productDistrict.toUpperCase) {
					// console.log(e.upazilla);
					tempStringArray = e.upazilla as string[];
				}
			});
			// console.log(tempStringArray);
			tempStringArray.forEach((e) => {
				temp2.push({ value: e, label: e });
			});
			setUpazillaOptions(temp2);
			// console.log(temp2);
		}
	}
	const addFields = () => {
		setFormFields([...formFields, { propertyName: '', propertyValue: '', propertyID: formFields.length }]);
	};
	const removeFields = (index: number) => {
		const values = [...formFields];
		values.splice(index, 1);
		setFormFields(values);
	};
	const addFields2 = () => {
		setFormFields2([...formFields2,
			{ price: '', perday: true, exceeds: false, exceedsDays: '', pricingSchemeID: formFields2.length }]);
	};
	const removeFields2 = (index: number) => {
		const values = [...formFields2];
		values.splice(index, 1);
		setFormFields2(values);
	};
	// const fileHandler = (e: any) => {
	//   console.log(e.target.files);
	//   setProductPicUpload(e.target.files);
	//   console.log(`productpic${productPicUpload}`);
	// };
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
					Division
					<Select
						id="locationDivision"
						className=""
						options={divisionOptions}
						defaultValue={{
							value: '',
							label: 'Select an option',
						}}
						onChange={(e) => {
							if (e != null) {
								setProductDivision(e.value);
								getDistrictOptions(e.value);
							}
						}}
						name="subjects"
					/>

					District
					<Select
						options={districtOptions}
						defaultValue={{
							value: '',
							label: 'Select an option',
						}}
						onChange={(e) => {
							if (e != null) {
								setProductDistrict(e.value);
							}
						}}
						name="subjects"
					/>

					Upazilla
					<Select
						options={upazillaOptions}
						defaultValue={{
							value: '',
							label: 'Select an option',
						}}
						onFocus={() => {
							getUpazillaOptions2(productDivision);
						}}
						onChange={(e) => {
							if (e) {
								// console.log(productDistrict);
								// getUpazillaOptions(productDistrict);
								setProductUpazilla(e.value);
							}
						}}
						name="subjects"
					/>
					<div>
						{
							formFields.map((element) => (
								<div key={element.propertyID} className="">
									<div className="grid grid-cols-2 gap-1">
										<input
											type="text"
											placeholder="Property Name"
											className="shadow appearance-none
										border rounded w-full py-2 px-3 text-[#db2777]
											leading-tight focus:outline-[#10b981]"
											// eslint-disable-next-line no-return-assign
											onChange={
												// eslint-disable-next-line no-return-assign
												(e) => formFields[element.propertyID].propertyName = e.target.value
											}
										/>

										<input
											type="text"
											placeholder="Property Value"
											className="shadow appearance-none
										border rounded w-full py-2 px-3 text-[#10b981]
											leading-tight focus:outline-[#db2777]"
											// eslint-disable-next-line no-return-assign
											onChange={
												(e) => formFields[element.propertyID].propertyValue = e.target.value
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
												<button type="button" onClick={() => removeFields(element.propertyID)}>
													<MdOutlineRemoveCircle size="29" />
												</button>
											</div>
										</div>
									</div>
								</div>

							))
						}
					</div>
					<label htmlFor="productPolicy">
						Product Policy
						<h6 className="font-normal">
							Policy is used to make your products safe. Say how you want the renters to use and
							care of your products.
							You can also mention the rules and regulations of the use of your products.
							These policies will also be used to give you an
							edge in taking legal actions if some rare incidents occurs
						</h6>
						<textarea
							id="productDescription"
							className="shadow appearance-none
									border rounded w-full py-2 px-3 h-16 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
							onChange={(e) => setPolicy(e.target.value)}
						/>
					</label>
					<div>
						{
							formFields2.map((element) => (
								<div key={element.pricingSchemeID}>
									BDT
									<input
										type="number"
										placeholder="Charge"
										onChange={(e) => {
											formFields2[element.pricingSchemeID].price = e.target.value;
										}}
									/>
									for usage
									<select onChange={(e) => {
										if (e.target.value === 'perday') {
											formFields2[element.pricingSchemeID].perday = true;
										} else if (e.target.value === 'exceeds') {
											formFields2[element.pricingSchemeID].exceeds = true;
											formFields2[element.pricingSchemeID].perday = false;
										}
									}}
									>
										<option value="default">-- select a value --</option>
										<option value="perday">per day</option>
										<option value="exceeds">exceeds</option>
									</select>
									if exceeds
									<input
										placeholder="Exceeding days"
										type="number"
										onChange={(e) => {
											if (formFields2[element.pricingSchemeID].exceeds) {
												formFields2[element.pricingSchemeID].exceedsDays = e.target.value;
											}
										}}
									/>
									<button type="button" onClick={addFields2}> Add Fields </button>
									<button type="button" onClick={() => removeFields2(element.pricingSchemeID)}>
										Remove Fields
									</button>
								</div>

							))
						}
					</div>
					Quantity
					<input type="number" onChange={(e) => setQuantity(e.target.value)} />
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
