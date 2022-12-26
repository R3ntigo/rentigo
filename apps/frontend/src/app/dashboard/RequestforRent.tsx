import { Product, Request, RequestStatus } from '@rentigo/models';
import { TimeUnit } from '@rentigo/constants';
import { RequestTile } from './ProductTile';
import { demoProductGlobal } from './ListedProduct';

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
	return (
		<>
			<div className="absolute top-6 w-full text-center">
				<h1 className="text-2xl font-semibold">Rent Requests of Sakib</h1>
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
			<div>
				<h1>Request for Rent</h1>
				{/* <RequestTile request={demoRequestGlobal[0]} /> */}
			</div>
		</>
	);
};

export { RequestforRent };
