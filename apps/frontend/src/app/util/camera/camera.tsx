import { useEffect, useRef } from 'react';

interface CameraProps {
	constraints?: MediaStreamConstraints
	width: number;
	height: number;
	getPicture(): void;
}

const Camera = (props: CameraProps) => {
	const { constraints, width, height } = props;

	const videoRef = useRef<HTMLVideoElement>(null);
	const photoRef = useRef<HTMLCanvasElement>(null);

	const getVideo = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			const video = videoRef.current;
			video!.srcObject = stream;
			video!.play();
		} catch (err) {
			console.error(err);
		}
	};

	const takePicture = () => {
		const video = videoRef.current;
		const photo = photoRef.current;
		photo!.width = width;
		photo!.height = height;
		const ctx = photo!.getContext('2d');
		ctx!.drawImage(video!, 0, 0, width, height);
	};

	const clearImage = () => {
		const photo = photoRef.current;
		const ctx = photo!.getContext('2d');
		ctx!.clearRect(0, 0, photo!.width, photo!.height);
	};

	useEffect(() => {
		getVideo();
	}, [videoRef]);

	return (
		<div className="container">
			<video ref={videoRef} width={width} height={height}>
				<track kind="captions" />
			</video>
		</div>
	);
};

Camera.defaultProps = {
	constraints: {
		video: true,
		audio: false,
	},
};

export { Camera };
