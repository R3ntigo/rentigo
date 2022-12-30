import { useEffect, useRef, useState } from 'react';
import { Registration } from '@rentigo/models';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../store/store';

const ConfirmNID = () => {
	const registration = useSelector((state: RootState) => state.registration);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!registration.id) {
			navigate('/register');
		}
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<p className="text-2xl font-bold">Confirm Personal Info</p>
			{/* show nid, first name, last name, dob */}
			<br />
			<p>
				NID Number:
				{' '}
				{registration.nid}
			</p>
			<p>
				First Name:
				{' '}
				{registration.firstName}
			</p>
			<p>
				Last Name:
				{' '}
				{registration.lastName}
			</p>
			<p>
				Date of Birth:
				{`${registration.dob}`}
			</p>
			<br />
			{/* show a button to confirm the information */}
			<button
				type="button"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={async () => {
					try {
						const response = await axios.get(`/api/register/verify-personal-info/${registration.id}`);
						const updatedRegistration: Registration = response.data;
						navigate(`/register/${updatedRegistration.status}/`);
					} catch (error) {
						toast.error('Something went wrong. Please verify the nid again.');
						setTimeout(() => {
							navigate('/register');
						}, 3000);
					}
				}}
			>
				Confirm
			</button>
		</div>
	);
};

export { ConfirmNID };
