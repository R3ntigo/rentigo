import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import axios, { AxiosError } from 'axios';
import { SignInDto } from '@rentigo/types/dto';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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
		<>
			<h1>SignIn</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="username">
					Username
					<input type="text" {...register('username')} />
				</label>
				{errors.username && <p>{errors.username.message}</p>}
				<br />
				<label htmlFor="password">
					Password
					<input type="password" {...register('password')} />
				</label>
				{errors.password && <p>{errors.password.message}</p>}
				<br />
				<button type="submit">Sign In</button>
			</form>
			{errorResponseMessage && <p>{errorResponseMessage}</p>}
		</>
	);
};

export { SignIn };
