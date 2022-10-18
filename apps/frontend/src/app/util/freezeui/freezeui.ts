import axios from 'axios';
import './freezeui.css';

class FreezeUI {
	private requests = 0;

	private freezeHtml = document.createElement('div');

	private options = {
		text: '',
		selector: ''
	};

	constructor(options: { text: 'Loading', selector: '' }) {
		this.freezeHtml.classList.add('freeze-ui');
		axios.interceptors.request.use((config) => {
			this.freeze();
			return config;
		}, (error) => {
			this.unfreeze();
			return Promise.reject(error);
		});

		axios.interceptors.response.use((response) => {
			this.unfreeze();
			return response;
		}, (error) => {
			this.unfreeze();
			return Promise.reject(error);
		});
	}

	private freeze() {
		this.requests += 1;

		const parent = this.options.selector !== '' ? document.querySelector(this.options.selector) : document.body;
		this.freezeHtml.setAttribute('data-text', this.options.text || 'Loading');
		if (this.options.selector !== '') {
			this.freezeHtml.style.position = 'absolute';
		}

		parent?.appendChild(this.freezeHtml);
	}

	private unfreeze() {
		this.requests -= 1;
		if (this.requests === 0) {
			const element = document.querySelector('.freeze-ui');
			if (element) {
				element.classList.add('is-unfreezing');
				setTimeout(() => {
					if (element) {
						element.classList.remove('is-unfreezing');
						element.parentElement?.removeChild(element);
					}
				}, 0);
			}
		}
	}
}

const freezeUI = new FreezeUI({ text: 'Loading', selector: '' });

const enableFreezeUI = () => freezeUI;

export { enableFreezeUI };
