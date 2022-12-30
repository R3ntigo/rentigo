import { Product, Request } from '@rentigo/models';
import { TimeUnit, RequestStatus } from '@rentigo/constants';
import { useState, useEffect } from 'react';
import { RequestTile } from './ProductTile';
import { demoProductGlobal } from './ListedProduct';
import { withAuth } from '../auth/withAuth';

// decare a global variable

// export const demoRequestGlobal : Request[] = [{
// 	id: '1',
// 	user: demoProductGlobal[0].lender,
// 	product: demoProductGlobal[0],
// 	quantity: 1,
// 	address: demoProductGlobal[0].address,
// 	duration: {
// 		unit: TimeUnit.DAY,
// 		length: 1
// 	},
// 	status: RequestStatus.PENDING,
// 	createdAt: new Date(),
// 	updatedAt: new Date(),
// 	deletedAt: new Date()

// }];

const RequestforRent = () => {
	const hello = 'hello';
	const [demoRequest, setInitialRequestState] = useState<Request[]>();
	async function fetchRequests() {
		const response = await fetch('/api/request/page/1');
		const data = await response.json();
		setInitialRequestState(data);
		console.log(data);
	}
	async function fetchProduct(id: string) {
		const response = await fetch(`/api/product/${id}`);
		const data = await response.json();
		console.log(data);
		return data;
	}
	useEffect(() => {
		fetchRequests();
	}, []);
	if (!demoRequest) return <div>Loading...</div>;
	return (
		<>
			<div className="absolute top-6 w-full text-center">
				<h1 className="text-2xl font-semibold">Rent Requests</h1>
			</div>
			<div className="h-24 md:p-8  grid grid-cols-3">
				<div
					className="
			bg-primary mix-blend-multiply filter blur-xl opacity-70 "
				/>
				<div
					className="
			bg-secondary mix-blend-multiply filter blur-xl opacity-70 "
				/>
				<div
					className="
			bg-accent1 mix-blend-multiply filter blur-xl opacity-70 "
				/>
			</div>
			<br />
			{demoRequest.map((request) => (
				<div key={request.id} className="border-b-4 border-purple-700">
					<RequestTile request={request} />
				</div>
			))}
			<br />
			<br />
			<br />
		</>
	);
};

const RequestforRentWithAuth = withAuth(RequestforRent);

export { RequestforRent, RequestforRentWithAuth };
