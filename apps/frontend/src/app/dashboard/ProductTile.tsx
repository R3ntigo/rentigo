import { useEffect, useState } from 'react';
import { Product, Request } from '@rentigo/models';
import { RequestStatus } from '@rentigo/constants';

const ProductTile = (props: { product: Product }) => {
	const hello = 'hello';

	const { product } = props;
	return (
		<a href="/sign-in">
			<div className="p-4 bg-slate-100 rounded-lg grid grid-cols-2 gap-2 ">

				<div>
					<p className="font-bold">
						#
						{product.id}
					</p>
					{' '}
					<p className="font-semibold">
						{product.title}
					</p>
					{' '}
					<p className="font-semibold">
						create date:
						{' '}
						{product.createdAt?.getDate()}
					</p>
					{' '}
					<p className="font-semibold">
						money earned:
					</p>
				</div>
				<div className="grid justify-items-end">
					<div>
						<img
							className="w-24 h-24"
							src={`../img/${product.imageUrls[0]}.jpg`}
							alt=""
							width="384"
							height="512"
						/>
					</div>
				</div>

			</div>
		</a>
	);
};

const RequestTile = (props: { request: Request }) => {
	const hello = 'hello';
	const { request } = props;
	const [demoProduct, setInitialProductState] = useState<Product>();
	async function fetchProduct() {
		const response = await fetch(`/api/product/${request.product.id}`);
		const data = await response.json();
		console.log(data);
		setInitialProductState(data);
	}
	useEffect(() => {
		fetchProduct();
	}, []);
	// if (!demoProduct) return (<div>Loading...</div>);
	// if (!request) return (<div>loading</div>);
	return (
		<a href="/sign-in">
			<div className="p-4 bg-slate-100 rounded-lg grid grid-cols-2 gap-2 ">

				<div>
					<p className="font-bold">
						#
						{request.id}
					</p>
					{' '}
					<p className="font-semibold">
						Requestor:
						{' '}
						{request.borrower.firstName}
					</p>
					{' '}
					<p className="font-semibold">
						date:
						{' '}
						{request.createdAt?.toLocaleString()}
					</p>
					{' '}
					<p className="font-semibold">
						status:
						{' '}
						{request.status === RequestStatus.PENDING ? 'pending' : 'approved'}
					</p>

				</div>
				<div className="grid justify-items-end">
					<div>
						<img className="w-24 h-24" src="jj" alt="" width="384" height="512" />
					</div>
				</div>

			</div>
		</a>
	);
};

export { ProductTile, RequestTile };
