import axios from 'axios';
import { useEffect } from 'react';

const Home = () => {
	useEffect(() => {
		axios.get('/api').then((res) => {
			console.log(res.data);
		});
	}, []);
	return <p>Welcome Frontend!</p>;
};

export { Home };
