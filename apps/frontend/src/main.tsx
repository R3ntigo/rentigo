import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'reflect-metadata';
import 'es6-shim';
// import axios from 'axios';

// import { FreezeUI, UnFreezeUI } from './app/util/freezeui/freezeui';
// import './app/util/freezeui/freezeui.css';

import { App } from './app/app';

// axios.interceptors.request.use((config) => {
// 	if (config.url?.match('authorized')) {
// 		// eslint-disable-next-line no-param-reassign
// 		// config.params = {
// 		// 	...config.params,
// 		// 	time: new Date().getTime(),
// 		// };
// 		FreezeUI();
// 	}
// 	return config;
// });

// axios.interceptors.response.use((response) => {
// 	if (response.config.url?.match('authorized')) {
// 		UnFreezeUI();
// 	}
// 	return response;
// }, (error) => {
// 	UnFreezeUI();
// 	return Promise.reject(error);
// });

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
