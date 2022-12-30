import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const AddNewAddress = () => {
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

	const [divisionOptions, setDivisionOptions] = useState([]);
	const [districtOptions, setDistrictOptions] = useState([]);
	const [productDivision, setProductDivision] = useState('');
	const [productDistrict, setProductDistrict] = useState('');
	const [subDistrict, setProductSubDistrict] = useState('');
	const [zipCode, setProductZipCode] = useState('');
	const [details, setProductDetails] = useState('');
	const [label, setProductLabel] = useState('');
	useEffect(() => {
		getDivisionOptions();
	}, []);
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
	async function handleSubmit() {
		const address = {
			division: productDivision,
			district: productDistrict,
			subDistrict,
			zipCode,
			details,
			label,
		};
		axios.post('/api/address', address)
			.then((res) => {
				console.log(res);
			});
	}
	return (
		<>
			<div className="absolute top-6 left-14 text-center">
				<h1 className="text-2xl font-semibold text-center">Add Your New address </h1>
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
                    <br />
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
<br />
					sub district:
					<input
						type="text"
						name="subDistrict"
						id="subDistrict"
						placeholder="sub district"
                        className="shadow appearance-none
									border rounded w-full py-2 px-3 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
						onChange={(e) => {
							setProductSubDistrict(e.target.value);
						}}
					/>
					zip code:
					<input
						type="text"
						name="zipCode"
						id="zipCode"
						placeholder="zip code"
                        className="shadow appearance-none
									border rounded w-full py-2 px-3 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
						onChange={(e) => {
							setProductZipCode(e.target.value);
						}}
					/>
                    <br />
					details:
					<input
						type="text"
						name="details"
						id="details"
						placeholder="details"
                        className="shadow appearance-none
									border rounded w-full py-2 px-3 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
						onChange={(e) => {
							setProductDetails(e.target.value);
						}}
					/>
                    <br />
					label:
					<input
						type="text"
						name="label"
						id="label"
						placeholder="label"
                        className="shadow appearance-none
									border rounded w-full py-2 px-3 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
						onChange={(e) => {
							setProductLabel(e.target.value);
						}}
					/>
                    <br />

					<button
						type="button"
						onClick={handleSubmit}
                        className="bg-transparent hover:bg-[#f59e0b] text-[#f59e0b] font-semibold
							hover:text-white py-2 px-4 border border-[#f59e0b] hover:border-transparent rounded"
					>
						{' '}
						Add new address
					</button>
                    <br />
                    <br />
				</div>
			</div>

		</>
	);
};

export { AddNewAddress };
