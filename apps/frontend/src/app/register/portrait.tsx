import { useEffect, useRef, useState } from 'react';
import { Registration } from '@rentigo/models';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Camera, Photo, CameraRef } from '../util/camera/camera';
import type { RootState } from '../store/store';
import { setRegistration } from '../store/registration.reducer';

export const Portrait = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const registration = useSelector((state: RootState) => state.registration);
	const camera = useRef<CameraRef>(null);
	const [images, setImage] = useState<Photo[]>([]);
	const [noOfImagesCaptured, setNoOfImagesCaptured] = useState(0);

	const width = window.innerWidth;
	const height = window.innerHeight;

	const takePicture = async () => {
		const photo = await camera.current!.takePicture();
		setImage([...images, photo]);
		setNoOfImagesCaptured(noOfImagesCaptured + 1);
	};

	const uploadImages = async () => {
		const formData = new FormData();
		images.forEach((image, index) => {
			const fileName = `image${index}`;
			const file = new File([image.blob!], fileName, { type: 'image/png' });
			formData.append('imageUrls', file);
		});
		formData.append('id', registration.id!.toString());

		// send a multipart/form-data request to the backend with axios
		let response: any;
		try {
			response = await axios.post('/api/register/verify-photo', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (error) {
			toast.error('Something went wrong. Please verify the nid again.');
			setTimeout(() => {
				navigate('/register');
			}, 3000);
		}

		const updatedRegistration: Registration = response.data;
		console.log(updatedRegistration);
		dispatch(setRegistration(updatedRegistration));
		navigate(`/register/${updatedRegistration.status}/`);
	};

	useEffect(() => {
		if (!registration.id) {
			navigate('/register');
		}
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			takePicture();
		}, 1000);
		if (noOfImagesCaptured === 3) {
			clearInterval(interval);
			uploadImages();
		}
		return () => clearInterval(interval);
	}, [noOfImagesCaptured]);

	return (
		<div>
			{/* Set a heading in the middle */}
			<p className="text-center text-2xl font-bold">
				Capturing Images
				{' '}
				{
				// Display the number of images captured
					`(${noOfImagesCaptured}/3)`
				}
			</p>
			<Camera width={width} height={height} ref={camera} />
		</div>
	);
};
