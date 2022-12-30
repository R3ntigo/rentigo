import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { Registration } from '@rentigo/models';
import { setRegistration } from '../store/registration.reducer';

export const VerifyEmail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const confirmEmail = async () => {
		const response = await axios.get(`/api/register/verify-email/${id}`);
		const registration: Registration = response.data;
		if (registration) {
			navigate(`/register/${registration.status}/`);
			dispatch(setRegistration(registration));
		} else {
			navigate('/register');
		}
	};

	useEffect(() => {
		if (!id) {
			navigate('/register');
		}
		confirmEmail();
		console.log(id);
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<p className="text-2xl font-bold">Email Verified</p>
			<p>
				Your email has been verified. You can now login to your account.
			</p>
		</div>
	);
};
