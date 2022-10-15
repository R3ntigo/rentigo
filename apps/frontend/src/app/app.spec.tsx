import { render } from '@testing-library/react';
import 'reflect-metadata';
import 'es6-shim';

import { MemoryRouter } from 'react-router-dom';
import { App } from './app';

describe('App', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		expect(baseElement).toBeTruthy();
	});

	it('should have a greeting as the title', () => {
		const { getByText } = render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);

		expect(getByText(/Welcome Frontend!/gi)).toBeTruthy();
	});
});
