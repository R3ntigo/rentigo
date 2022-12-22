import { useState } from 'react';
import { Product } from '@rentigo/models';

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

export { ProductTile };
