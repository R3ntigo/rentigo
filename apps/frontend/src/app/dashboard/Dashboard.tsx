/* eslint-disable jsx-a11y/no-static-element-interactions */
import { TfiLayoutMediaRight } from 'react-icons/tfi';
import { BsChatLeftText } from 'react-icons/bs';
import { RiLoginBoxLine } from 'react-icons/ri';
import { MdOutlineProductionQuantityLimits, MdOutlinePayments } from 'react-icons/md';
import { GrNotification } from 'react-icons/gr';
import { IoMdStats } from 'react-icons/io';

const Dashboard = () => {
	const ll = 0;
	const sayHello = () => {
		console.log('Hello');
	};
	return (
		<>
			<div className="absolute top-6 w-full text-center">
				<h1 className="text-2xl font-semibold">Hello User1</h1>
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
			<div className="border-spacing-4 h-10" />
			<div className="grid grid-cols-2 gap-4 px-10 h-fit">
				<div className="bg-slate-100 rounded-lg p-1 border-4 border-solid border-yellow-300">
					<a href="/rent-req-dash">
						<div className="flex justify-end">
							<div className="px-2">
								<TfiLayoutMediaRight size="64" color="yellow[300]" />
							</div>
						</div>
						<div className=" top-20 left-3 text-left font-semibold text-xl">Request for rent</div>
					</a>
				</div>
				<div
					className="bg-slate-100
					rounded-lg p-1 border-4 border-solid border-purple-400"
					onClick={sayHello}
					onKeyDown={sayHello}
				>
					<div className="flex justify-end">
						<div className="p-3">
							<BsChatLeftText size="44" color="yellow[300]" />
						</div>
					</div>
					<div className=" relativeoff top-5 left-3 text-left font-semibold text-xl">Inbox</div>
				</div>
				<div className="bg-slate-100 rounded-lg p-1 border-4 border-solid border-pink-600">
					<div className="flex justify-end">
						<div className="px-2">
							<RiLoginBoxLine size="44" color="yellow[300]" />
						</div>
					</div>
					<div className="relativeoff px-1 left-3 text-left font-semibold text-xl">My Requested Products</div>
				</div>
				<div
					className="col-span-2 bg-slate-100 p-1 rounded-lg border-4 border-solid border-green-500"
					onClick={(e) => {
						window.location.href = '/listed-product';
					}}
					onKeyDown={sayHello}
				>
					<div className="flex justify-end">
						<div className="px-2">
							<MdOutlineProductionQuantityLimits size="44" color="yellow[300]" />
						</div>
					</div>
					<div className="text-left font-semibold text-xl">Listed Products  </div>
				</div>
				<div className="bg-slate-100 p-1 rounded-lg border-4 border-solid border-blue-700">
					<div className="flex justify-end">
						<div className="px-2">
							<GrNotification size="38" color="yellow[300]" />
						</div>
					</div>
					<div className="  p-2 text-left font-semibold text-xl">Notifications </div>
				</div>
				<div className="bg-slate-100 rounded-lg border-4 border-solid border-[#ff7c01]">
					<div className="flex justify-end">
						<div className="px-2">
							<IoMdStats size="44" color="yellow[300]" />
						</div>
					</div>
					<div className="  p-2 text-left font-semibold text-xl">Stats </div>
				</div>
				<div className="col-span-2 p-1 bg-slate-100 rounded-lg border-4 border-solid border-[#00dcf0]">
					<div className="flex justify-end">
						<div className="px-2">
							<MdOutlinePayments size="44" color="yellow[300]" />
						</div>
					</div>
					<div className=" font-semibold text-xl">Payments </div>
				</div>
				<div className=" p-4" />
				<div className=" p-4" />

				<div className=" p-4" />

			</div>
		</>
	);
};

export { Dashboard };
