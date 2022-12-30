import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Request } from '@rentigo/models';
import { RequestStatus } from '@rentigo/constants';
import axios from 'axios';
import { withAuth } from '../auth/withAuth';
import { ProductTile } from './ProductTile';

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
	// function to patch request status
	async function patchRequestStatus(i: number) {
		if (i == 1) {
			const response = await axios.patch(`/api/request/${id}`, {
				status: RequestStatus.APPROVED
			});
		} else {
			const response = await axios.patch(`/api/request/${id}`, {
				status: RequestStatus.REJECTED
			});
		}
		window.location.reload();
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
							<p className="text-2xl">
								{demoRequest.borrower.firstName}
								{' '}
								{demoRequest.borrower.lastName}
							</p>
						</p>
					</div>

				</div>
				<br />
				<div className="border-2 rounded-2xl border-[#2cf784] bg-slate-200">
					<div className="p-4">
						{' '}
						<p>
							<span className="font-semibold ">Requested at: </span>
							<p className="text-2xl">
								{demoRequest.createdAt?.toLocaleString()}
							</p>
						</p>
					</div>

				</div>
				<br />
				<div className="border-2 rounded-2xl border-[#56f79c] bg-slate-200">
					<ProductTile product={demoRequest.product} />
				</div>
				<br />
				<div className="border-2 rounded-2xl border-[#2cf784] bg-slate-200">
					<div className="p-4">
						{' '}
						<p>
							<span className="font-semibold ">Durations: </span>
							<span>
								<p className="text-xl">
									For
								</p>
								{' '}
								<p className="text-2xl">{demoRequest.duration.length}</p>
								{' '}
								<p className="text-2xl">{demoRequest.duration.unit}</p>
								{' '}
							</span>
						</p>
					</div>
				</div>
				<br />
				<div className="border-2 rounded-2xl border-[#d9f72c] bg-slate-200">
					<div className="p-4">
						{' '}
						<p>
							<span className="font-semibold ">Status: </span>
							<span>
								<p className="text-xl">
									{demoRequest.status}
								</p>
							</span>
						</p>
					</div>
				</div>
				<br />
				<div className="border-2 rounded-2xl border-[#f7d72c] bg-slate-200">
					{demoRequest.status == RequestStatus.PENDING && (
						<div className="p-4">
							{' '}
							<p>
								<span className="font-semibold ">Actions: </span>
								<br />
								<span>
									<p className="text-xl">
										<button
											className="bg-[#2cf736] hover:bg-[#f7d72c] text-black font-bold py-2 px-4 rounded-full"
											onClick={(e) => {
												e.preventDefault();
												patchRequestStatus(1);
											}}
										>
											Approve
										</button>
										{' '}
										{' '}
										<button
											className="bg-[#f73a2c] hover:bg-[#f7d72c] text-black font-bold py-2 px-4 rounded-full"
											onClick={(e) => {
												e.preventDefault();
												patchRequestStatus(0);
											}}
										>
											Reject
										</button>
									</p>
								</span>
							</p>
						</div>
					)}

				</div>
				<br />
				<br />
			</div>
		</>
	);
};
const RequestDetailWithAuth = withAuth(RequestDetail);
export { RequestDetail, RequestDetailWithAuth };
