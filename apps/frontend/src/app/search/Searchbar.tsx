// import { ChangeEvent, useState } from 'react';
// import axios from 'axios';

// const Searchbar = () => {
// 	const [value, setValue] = useState('');
// 	const [data, setData] = useState([]);

// 	async function onSearch(searchText:string) {
// 		const response = await axios.post('/api/search', {
// 			searchText
// 		});
// 		setData(response.data);
// 	}

// 	return (
// 		<div className="App">
// 			<h1>Search</h1>

// 			<div className="search-container">
// 				<div className="search-inner">
// 					<input
// 						type="text"
// 						value={value}
// 						onChange={(e) => {
// 							setValue(e.target.value);
// 						}}
// 					/>
// 					<button onClick={() => onSearch(value)}> Search </button>
// 				</div>
// 				<div className="dropdown">
// 					{data
// 						.filter((item) => {
// 							const searchTerm = value.toLowerCase();
// 							const fullName = item.full_name.toLowerCase();

// 							return (
// 								searchTerm
//                 && fullName.startsWith(searchTerm)
//                 && fullName !== searchTerm
// 							);
// 						})
// 						.slice(0, 10)
// 						.map((item) => (
// 							<div
// 								onClick={() => onSearch(item.full_name)}
// 								className="dropdown-row"
// 								key={item.full_name}
// 							>
// 								{item.full_name}
// 							</div>
// 						))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export { Searchbar };
