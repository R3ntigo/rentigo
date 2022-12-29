// const AddNewAddress = () => {
//     async function getDivisionOptions() {
// 		const { data } = await axios.get(
// 			`https://bdapis.com/api/v1.1/divisions`
// 		);
// 		// console.log(data);
// 		if (data.status.message === 'ok') {
// 			const divisions = data.data.map((division: Division) => ({
// 				// eslint-disable-next-line no-underscore-dangle
// 				value: division._id,
// 				label: division.name,
// 			}));
// 			setDivisionOptions(divisions);
// 			// console.log(`ere ${divisionOptions}`);
// 		} else {
// 			// console.log('Division fetching api failed');
// 		}
// 	}
//     async function getDistrictOptions(value: string) {
// 		const { data } = await axios.get(
// 			`https://bdapis.com/api/v1.1/division/${value}`
// 		);
// 		// console.log(data);
// 		if (data.status.message === 'ok') {
// 			const districts = data.data.map((district: District) => ({
// 				// eslint-disable-next-line no-underscore-dangle
// 				value: district._id,
// 				label: district.district,
// 			}));
// 			setDistrictOptions(districts);
// 		} else {
// 			console.log('District fetching api failed');
// 		}
// 	}
//     return ( 
//         <>
//         Division
// 					<Select
// 						id="locationDivision"
// 						className=""
// 						options={divisionOptions}
// 						defaultValue={{
// 							value: '',
// 							label: 'Select an option',
// 						}}
// 						onChange={(e) => {
// 							if (e != null) {
// 								setProductDivision(e.value);
// 								getDistrictOptions(e.value);
// 							}
// 						}}
// 						name="subjects"
// 					/>

// 					District
// 					<Select
// 						options={districtOptions}
// 						defaultValue={{
// 							value: '',
// 							label: 'Select an option',
// 						}}
// 						onChange={(e) => {
// 							if (e != null) {
// 								setProductDistrict(e.value);
// 							}
// 						}}
// 						name="subjects"
// 					/>

// 					Upazilla
// 					<Select
// 						options={upazillaOptions}
// 						defaultValue={{
// 							value: '',
// 							label: 'Select an option',
// 						}}
// 						onFocus={() => {
// 							getUpazillaOptions2(productDivision);
// 						}}
// 						onChange={(e) => {
// 							if (e) {
// 								// console.log(productDistrict);
// 								// getUpazillaOptions(productDistrict);
// 								setProductUpazilla(e.value);
// 							}
// 						}}
// 						name="subjects"
// 					/>
//         </>
//      );
// }
 
// export default AddNewAddress;