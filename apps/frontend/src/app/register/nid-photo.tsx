import { useForm } from 'react-hook-form';
import { Camera } from '../util/camera/camera';

interface NIDPhotoDto {
	nidPhoto: FileList;
}

const onSubmit = (data: NIDPhotoDto) => {
	console.log(data);
};

const NIDPhoto = () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm<NIDPhotoDto>();
	const files = watch('nidPhoto');
	console.log(files);

	return (
		<>
			<h1>NIDPhoto</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="nidPhoto">
					NID Photo
					<input type="file" {...register('nidPhoto')} />
				</label>
				{errors.nidPhoto && <p>{errors.nidPhoto.message}</p>}
				<br />
				<Camera width={480} height={270} />
				{files && files.length > 0
					&& <img src={URL.createObjectURL(files[0])} alt="nid" className="w-96 h-48" />}
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export { NIDPhoto };
