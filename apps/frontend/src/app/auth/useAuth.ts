import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`/api/auth/authorized`);
				if (response.data !== true) {
					navigate(`/sign-in`);
				}
			} catch (err) {
				navigate(`/sign-in`);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return { isLoading };
};

export { useAuth };
