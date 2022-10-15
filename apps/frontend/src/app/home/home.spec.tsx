import { render } from '@testing-library/react';
import 'reflect-metadata';
import 'es6-shim';

import { Home } from './home';

describe('Home', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Home />);
		expect(baseElement).toBeTruthy();
	});
});
