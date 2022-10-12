/* eslint-disable no-tabs */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import console from 'console';

const Test = () => {
	interface Options {
		value: string;
		label: string;
	}
	interface Division {
		_id: string;
		name: string;
	}
	interface District {
		_id: string,
		district: string,
	}

	interface Upazilla {
		_id: string,
		district: string,
	}

	interface District2 {
		_id: string,
		district: string,
		coordinates: string,
		upazilla: string[]

	}

	const [productName, setProductName] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [divisionOptions, setDivisionOptions] = useState([] as Options[]);
	const [productDivision, setProductDivision] = useState('');
	const [districtOptions, setDistrictOptions] = useState([] as Options[]);
	const [upazillaOptions, setUpazillaOptions] = useState([] as Options[]);
	const [productDistrict, setProductDistrict] = useState('');
	const [productUpazilla, setProductUpazilla] = useState('');

	// const usertoken = localStorage.getItem('usertoken');
	// console.log(usertoken);
	// const decodeduser = jwt.decode(usertoken);
	// console.log(decodeduser);
	const handleSubmit = async () => {
		if (/* decodeduser != null */ true) {
			// const userID = decodeduser.id;
			// console.log("lol" + restaurantID);
			const newProduct = {
				productName,
				productDescription,
				productDivision,
				productDistrict,
				productUpazilla,

			}
			console.log(newProduct);
		}
	}
	async function getDivisionOptions() {
		const { data } = await axios.get(`https://bdapis.herokuapp.com/api/v1.1/divisions`);
		console.log(data);
		if (data.status.message === 'ok') {
			const divisions = data.data.map((division: Division) => ({
				value: division._id,
				label: division.name,
			}));
			setDivisionOptions(divisions);
			console.log(`ere ${divisionOptions}`);
		} else {
			console.log('Division fetching api failed');
		}
	}
	useEffect(() => {
		getDivisionOptions();
	}, []);
	async function getDistrictOptions(value: string) {
		const { data } = await axios.get(`https://bdapis.herokuapp.com/api/v1.1/division/${value}`);
		console.log(data);
		if (data.status.message === 'ok') {
			const districts = data.data.map((district: District) => ({
				value: district._id,
				label: district.district,
			}));
			setDistrictOptions(districts);
		} else {
			console.log('District fetching api failed');
		}
	}
	async function getUpazillaOptions(value: string) {
		console.log(value);
		const { data } = await axios.get(`https://bdapis.herokuapp.com/api/v1.1/division/${value}`);
		console.log(data);

		if (data.status.message === 'ok') {
			const upazillas = data.data.filter((upazilla: Upazilla) => upazilla.district === productDistrict);
			console.log(upazillas.upazilla);
			setUpazillaOptions(upazillas.upazilla);
		} else {
			console.log('District fetching api failed');
		}
	}
	async function getUpazillaOptions2(value: string) {
		console.log(value);
		const { data } = await axios.get(`https://bdapis.herokuapp.com/api/v1.1/division/${value}`);
		console.log(data);
		const tempStringArray: string[] = [];
		const temp2: Options[] = [];
		if (data.status.message === 'ok') {
			data.data.forEach((e: District2) => {
				if (e.district === productDistrict) {
					tempStringArray.push(...e.upazilla);
				}
			});
			tempStringArray.forEach((e) => {
				temp2.push({ value: e, label: e });
			});
			setUpazillaOptions(temp2);
			console.log(temp2);
		}
	}
	return (
		<div>
    	<h1>Product Upload</h1>
    	<label>
    		Product Name
    		<input type="text" onChange={(e) => setProductName(e.target.value)} />
  		</label>
    	<label>
  Product Description
				<input type="text" onChange={(e) => setProductDescription(e.target.value)} />
			</label>
    <label>
  Division
				<Select
					options={divisionOptions}
					defaultValue={
						{
							value: '',
							label: 'Select an option'
						}
					}

					onChange={(e) => {
						if (e != null) {
							setProductDivision(e.value);
							getDistrictOptions(e.value);
						}
					}}
					name="subjects"
				/>
			</label>
    <label>
  District
				<Select
					options={districtOptions}
					defaultValue={
						{
							value: '',
							label: 'Select an option'
						}
					}
					onChange={(e) => {
						if (e != null) {
							setProductDistrict(e.value);
						}
					}}
					name="subjects"
				/>
			</label>
    <label>
  Upazilla
				<Select
					options={upazillaOptions}
					defaultValue={
						{
							value: '',
							label: 'Select an option'
						}
					}
					onFocus={() => {getUpazillaOptions2(productDivision)}}
					onChange={(e) => {
						if (e) {
							console.log(productDistrict);
							getUpazillaOptions(productDistrict);
							setProductUpazilla(e.value);
						}
					}}
					name="subjects"
				/>
			</label>
    <input type="submit" value="Submit" onClick={handleSubmit} />

  </div>
	)

};
export default Test;
