import { useState } from 'react';
import { Product, Request, RequestStatus } from '@rentigo/models';

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
					</p>
					{' '}
					<p className="font-semibold">
						money earned:
					</p>
				</div>
				<div className="grid justify-items-end">
					<div>
						<img className="w-24 h-24" src="/sarah-dayan.jpg" alt="" width="384" height="512" />
					</div>
				</div>

			</div>
		</a>
	);
};

const RequestTile = (props: { request: Request }) => {
	const hello = 'hello';
	const { request } = props;
	// const statusColoring = (status: RequestStatus) => {
	// 	console.log(status);
	// 	switch (status) {
	// 	// case RequestStatus.PENDING:
	// 	// 	return 'text-yellow-200';
	// 	// case RequestStatus.APPROVED:
	// 	// 	return 'text-green-200';
	// 	// case RequestStatus.REJECTED:
	// 	// 	return 'text-red-200';
	// 	default:
	// 		return 'text-gray-200';
	// 	}
	// };
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
						{request.updatedAt?.getDate()}
					</p>
					{' '}
				</div>
				<div className="grid justify-items-end">
					<div>
						<img className="w-24 h-24" src="/sarah-dayan.jpg" alt="" width="384" height="512" />
					</div>
				</div>

			</div>
		</a>
	);
};

export { ProductTile, RequestTile };
