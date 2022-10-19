import { render } from '@testing-library/react';
import 'reflect-metadata';
import 'es6-shim';

import { MemoryRouter } from 'react-router-dom';
import { SignIn } from './sign-in';

describe('SignIn', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<MemoryRouter>
				<SignIn />
			</MemoryRouter>
		);
		expect(baseElement).toBeTruthy();
	});
});
