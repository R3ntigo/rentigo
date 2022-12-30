import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface CameraProps {
	constraints?: MediaStreamConstraints
	width: number;
	height: number;
}

interface Photo {
	url?: string;
	blob?: Blob | null;
}

interface CameraRef {
	takePicture: () => Promise<Photo>;
}

// eslint-disable-next-line react/display-name
const Camera = forwardRef((props: CameraProps, ref: ForwardedRef<CameraRef>) => {
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

	useImperativeHandle(ref, () => ({
		takePicture: async () => {
			const video = videoRef.current;
			const photo = photoRef.current;
			photo!.width = width;
			photo!.height = height;
			const ctx = photo!.getContext('2d');
			ctx!.drawImage(video!, 0, 0, width, height);
			return new Promise((resolve) => {
				photo!.toBlob((blob: Blob | null) => {
					const url = URL.createObjectURL(blob!);
					resolve({ url, blob });
				}, 'image/png');
			});
		}
	}));

	useEffect(() => {
		getVideo();
	}, [videoRef]);

	return (
		<div className="container">
			<video ref={videoRef} style={{ width, height }}>
				<track kind="captions" />
			</video>
			<canvas
				ref={photoRef}
				width={width}
				height={height}
				className="hidden absolute -z-10"
			/>
		</div>
	);
});

Camera.defaultProps = {
	constraints: {
		video: { facingMode: 'environment' },
		audio: false,
	},
};

export { Camera, Photo, CameraRef };
