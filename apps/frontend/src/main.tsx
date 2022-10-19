import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'reflect-metadata';
import 'es6-shim';

import { App } from './app/app';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
