import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Registration } from '@rentigo/models';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../store/store';

const ConfirmEmail = () => {
	const registration = useSelector((state: RootState) => state.registration);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!registration.id) {
			navigate('/register');
		}
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data: any) => {
		try {
			const response = await axios.post(`/api/register/confirm-email/${registration.id}`, data, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			toast.success('Email verification sent. Please check your email.');
		} catch (error) {
			toast.error('Something went wrong. Please verify the email again.');
			setTimeout(() => {
				navigate('/register');
			}, 3000);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<p className="text-2xl font-bold">Confirm Email</p>
			{/* Form Input for email */}

			<form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
							Email
						</label>
					</div>
					<div className="md:w-2/3">
						<input
							{...register('email')}
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							id="inline-email"
							type="email"
							placeholder="Email"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Send Verification
				</button>
			</form>
		</div>
	);
};

export { ConfirmEmail };
