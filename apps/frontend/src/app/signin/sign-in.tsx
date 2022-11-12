import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import axios, { AxiosError } from 'axios';
import { SignInDto } from '@rentigo/types/dto';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';

const SignIn = () => {
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
			await axios.post('/api/sign-in', data);
			navigate(-1);
		} catch (error) {
			const axiosError = error as AxiosError;
			setErrorResponseMessage(axiosError.message as string);
		}
	};

	return (
		<div className="antialiased text slate-500 dark:text-slate-400 bg-white">
			<div className="h-screen relative flex items-center justify-center px-16">
				<div className="relative w-full max-w-lg">
					<div className="">
						<div className="absoulute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full" />
						<div className="absoulute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full" />
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor="username" className="text-2xl">
							Username
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
						<br />
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
						<br />
						<button
							type="submit"
							className="bg-transparent hover:bg-[#f59e0b] text-[#f59e0b] font-semibold
							hover:text-white py-2 px-4 border border-[#f59e0b] hover:border-transparent rounded"
						>
							Sign In
						</button>
					</form>
				</div>
				{errorResponseMessage && <p>{errorResponseMessage}</p>}
			</div>
		</div>

	);
};

export { SignIn };
