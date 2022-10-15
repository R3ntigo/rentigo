import { render } from '@testing-library/react';
import 'reflect-metadata';
import 'es6-shim';

import { SignIn } from './sign-in';

describe('SignIn', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<SignIn />);
		expect(baseElement).toBeTruthy();
	});
});
