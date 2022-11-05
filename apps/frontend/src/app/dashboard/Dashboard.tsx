const Dashboard = () => {
	const ll = 0;
	return (
		<>
			<div className="absolute top-6 w-full text-center">
				<h1 className="text-2xl font-semibold">Hello User1</h1>
			</div>
			<div className="h-24 md:p-8  grid grid-cols-3">
				<div
					className="
			bg-purple-300 mix-blend-multiply filter blur-xl opacity-70 "
				/>
				<div
					className="
			bg-yellow-300 mix-blend-multiply filter blur-xl opacity-70 "
				/>
				<div
					className="
			bg-pink-300 mix-blend-multiply filter blur-xl opacity-70 "
				/>
			</div>
			<div className="border-spacing-4 h-10"></div>
			<div className="grid grid-cols-2 gap-4 px-10 h-screen">
				<div className="bg-slate-100 rounded-lg border-4 border-solid border-yellow-300">01</div>
				<div className="bg-slate-100 rounded-lg border-4 border-solid border-purple-400">02</div>
				<div className="bg-slate-100 rounded-lg border-4 border-solid border-pink-600">03</div>
				<div className="col-span-2 bg-slate-100 rounded-lg border-4 border-solid border-green-500">04</div>
				<div className="bg-slate-100 rounded-lg border-4 border-solid border-blue-700">05</div>
				<div className="bg-slate-100 rounded-lg border-4 border-solid border-[#ff7c01]">06</div>
				<div className="col-span-2 bg-slate-100 rounded-lg border-4 border-solid border-[#00dcf0]">07</div>
				<div />
				<div />

			</div>
		</>
	);
};

export { Dashboard };
