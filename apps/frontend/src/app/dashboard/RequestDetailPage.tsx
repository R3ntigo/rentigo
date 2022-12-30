import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Request } from '@rentigo/models';
import { withAuth } from '../auth/withAuth';

const RequestDetail = () => {
	const hello = 'hello';
	const { id } = useParams();
	const [demoRequest, setInitialRequestState] = useState<Request>();
	async function fetchRequest() {
		const response = await fetch(`/api/request/${id}`);
		const data = await response.json();
		console.log(data);
		setInitialRequestState(data);
	}
	useEffect(() => {
		fetchRequest();
	}, []);

	if (!demoRequest) return (<div>Loading...</div>);

	return (
		<>
			<div className="absolute top-6 w-full text-center">
				<h1 className="text-2xl font-semibold">
					Request Detail for
					{' '}
					{demoRequest.borrower.firstName}
				</h1>
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
			<div className="p-10">
				<div className="border-2 rounded-2xl border-[#0bf570] bg-slate-200">
					<div className="p-4">
						{' '}
						<p>
							<span className="font-semibold ">Borrower: </span>
							{demoRequest.borrower.firstName}
							{' '}
							{demoRequest.borrower.lastName}
						</p>
					</div>

				</div>
			</div>
		</>
	);
};
const RequestDetailWithAuth = withAuth(RequestDetail);
export { RequestDetail, RequestDetailWithAuth };
