/**
 * Setup the freeze element to be appended
 */
const freezeHtml = document.createElement('div');
freezeHtml.classList.add('freeze-ui');

/**
	* Freezes the UI
	* options = {
	* selector: '.class-name' -> Choose an element where to limit the freeze or leave empty to freeze the whole body.
	Make sure the element has position relative or absolute,
	* text: 'Magic is happening' -> Choose any text to show or use the default "Loading".
	* Be careful for long text as it will break the design.
	* }
	*/
const FreezeUI = (options: { text: string, selector: string } = { text: 'Loading', selector: '' }) => {
	const parent = options.selector !== '' ? document.querySelector(options.selector) : document.body;
	freezeHtml.setAttribute('data-text', options.text || 'Loading');
	if (options.selector !== '') {
		freezeHtml.style.position = 'absolute';
	}
	parent?.appendChild(freezeHtml);
};

/**
	 * Unfreezes the UI.
	 * No options here.
	 */
const UnFreezeUI = () => {
	const element = document.querySelector('.freeze-ui');
	if (element) {
		element.classList.add('is-unfreezing');
		setTimeout(() => {
			if (element) {
				element.classList.remove('is-unfreezing');
				element.parentElement?.removeChild(element);
			}
		}, 50);
	}
};

export { FreezeUI, UnFreezeUI };
