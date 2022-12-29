import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { BarcodeScanner, EnumBarcodeFormat } from 'dynamsoft-javascript-barcode';
import { toast } from 'react-toastify';

const NIDPhoto = () => {
	const [frontPhoto, setFrontPhoto] = React.useState<File>();
	const [backPhoto, setBackPhoto] = React.useState<File>();
	const [isFrontPhotoTaken, setIsFrontPhotoTaken] = React.useState<boolean>(false);
	const [isBackPhotoTaken, setIsBackPhotoTaken] = React.useState<boolean>(false);

	const [frontPhotoUrl, setFrontPhotoUrl] = React.useState<string>();
	const [backPhotoUrl, setBackPhotoUrl] = React.useState<string>();

	useEffect(() => {
		setFrontPhotoUrl('https://via.placeholder.com/300x200.png?text=Front+of+NID');
		setBackPhotoUrl('https://via.placeholder.com/300x200.png?text=Back+of+NID');
		// eslint-disable-next-line max-len
		BarcodeScanner.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxNTY1OTU5LVRYbFhaV0pRY205cVgyUmljZyIsIm9yZ2FuaXphdGlvbklEIjoiMTAxNTY1OTU5IiwiY2hlY2tDb2RlIjotNzMyNTA0ODE3fQ';
		BarcodeScanner.engineResourcePath = 'https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.1/dist/';
		BarcodeScanner.loadWasm().then(() => {
			console.log('WASM loaded');
		});
	}, []);

	return (
		<>
			<form className="flex flex-col gap-4">
				<div className="flex flex-col gap-4">
					<h2 className="font-semibold">Front Photo</h2>
					<img src={frontPhotoUrl} alt="Front of NID" />
					<label htmlFor="front-image" className="text-gray-700 font-semibold">
						<div className="flex flex-col gap-4">
							<input
								id="front-image"
								name="frontImage"
								type="file"
								accept="image/*"
								onChange={(e) => {
									const image = e.target.files![0];
									setFrontPhoto(image);
									setIsFrontPhotoTaken(true);
									setFrontPhotoUrl(URL.createObjectURL(image));
								}}
							/>
						</div>
					</label>
				</div>
				<div className="flex flex-col gap-4">
					<h2 className="font-semibold">Back Photo</h2>
					<img src={backPhotoUrl} alt="Back of NID" />
					<label htmlFor="back-image" className="text-gray-700 font-semibold">
						<div className="flex flex-col gap-4">
							<input
								id="back-image"
								name="backImage"
								type="file"
								accept="image/*"
								onChange={(e) => {
									const image = e.target.files![0];
									setBackPhoto(image);
									setIsBackPhotoTaken(true);
									setBackPhotoUrl(URL.createObjectURL(image));
								}}
							/>
						</div>
					</label>
				</div>
			</form>
			<br />
			{isFrontPhotoTaken && isBackPhotoTaken && (
				<button
					type="button"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={async () => {
						const scanner = await BarcodeScanner.createInstance();
						const settings = await scanner.getRuntimeSettings();
						// eslint-disable-next-line no-bitwise
						settings.barcodeFormatIds = EnumBarcodeFormat.BF_PDF417 | EnumBarcodeFormat.BF_MICRO_PDF417;
						await scanner.updateRuntimeSettings(settings);

						const url = URL.createObjectURL(backPhoto!);
						const results = await scanner.decodeUrl(url);
						if (!results.length) {
							toast.error('Problem reading the NID. Please try again');
							return;
						}
						const nid = results[0];

						// send the barcode to the server
						const formData = new FormData();
						formData.append('frontImage', frontPhoto!);
						formData.append('backImage', backPhoto!);
						formData.append('nid', JSON.stringify(nid));
						const response = await axios.post(
							'/api/register/verify-nid',
							formData,
							{
								headers: {
									'Content-Type': 'multipart/form-data',
								}
							}
						);

						console.log(response);
					}}
				>
					Next
				</button>
			)}
			<br />
			<br />
			<br />
			<br />
		</>
	);
};

export { NIDPhoto };
