import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { SignInDto } from '@rentigo/dto';

const SignIn2 = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInDto>({
		resolver: classValidatorResolver(SignInDto),
	});

	const [errorResponseMessage, setErrorResponseMessage] = useState('');

	const onSubmit = async (data: SignInDto) => {
		setErrorResponseMessage('');
		try {
			await axios.post('/api/auth/sign-in', data);
			navigate(-1);
		} catch (error) {
			const axiosError = error as AxiosError;
			setErrorResponseMessage(axiosError.message as string);
		}
	};
	return (
		<div className="grid h-screen place-items-center">
			<div className="relative w-full">
				<div
					className="absolute top-0
				-left-4 w-72 h-72
			bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
				/>
				<div
					className="absolute top-0
			-right-4 w-72 h-72
			bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
				/>
				<div
					className="absolute -bottom-8
			left-20 w-72 h-72
			bg-accent1 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
				/>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="m-8 relative space-y-4">
						<div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
							<div className="flex-1">
								<label htmlFor="email" className="text-2xl">
									Email
									<input
										type="text"
										{...register('username')}
										className="shadow appearance-none
									border rounded w-full py-2 px-3 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
									/>
								</label>
								{errors.username
						&& (
							<p className="mt-2 text-sm text-red-600 dark:text-red-500 animate-pulse">
								{errors.username.message}
							</p>
						)}
							</div>
							<div>
								<div className="w-6 h-24 rounded-lg bg-primary" />
							</div>
						</div>
						<div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
							<div className="flex-1">
								<label htmlFor="password" className="text-2xl">
									Password
									<input
										type="password"
										{...register('password')}
										className="shadow appearance-none
									border rounded w-full py-2 px-3 text-[#db2777]
										leading-tight focus:outline-[#10b981]"
									/>
								</label>
								<br />
								{errors.password
						&& (
							<p className="mt-2 text-sm text-red-600 dark:text-red-500 animate-pulse">
								{errors.password.message}
							</p>
						)}
							</div>
							<div>
								<div className="w-6 h-20 rounded-lg bg-secondary" />
							</div>
						</div>
						<div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
							<div className="flex-1">
								<button
									type="submit"
									className="bg-transparent hover:bg-[#f59e0b] text-[#f59e0b] font-semibold
							hover:text-white py-2 px-4 border border-[#f59e0b] hover:border-transparent rounded"
								>
									Sign In
								</button>
							</div>
							<div>
								<div className="w-28 h-6 rounded-lg bg-accent1" />
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export { SignIn2 };
