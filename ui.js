export class UiMascot {
	constructor(target, options = {}) {
		this.target = typeof target === 'string' ? document.querySelector(target) : target;
		if (!this.target) throw new Error('UiMascot target not found');
		this.options = {
			assetBase: './assets',
			variant: 'default',
			state: 'idle',
			size: 140,
			shadowSize: 86,
			alt: 'UI-Mascot',
			speechBubblePosition: 'left', // 'left' or 'right'
			speechBubbleMinWidth: 150,
			speechBubbleMaxWidth: 320,
			speechBubbleClosable: false,
			onClick: null,
			flipX: false,
			...options
		};

		// Main container
		this.el = document.createElement('div');
		this.el.className = 'ui';

		// Shadow
		this.shadow = document.createElement('img');
		this.shadow.className = 'ui__shadow';
		this.shadow.alt = '';
		this.shadow.setAttribute('aria-hidden', 'true');

		// Character wrapper
		this.wrap = document.createElement('div');
		this.wrap.className = 'ui__char-wrap';

		// Character image
		this.char = document.createElement('img');
		this.char.className = 'ui__char';
		this.char.alt = this.options.alt;
		this.char.addEventListener('load', () => this._updateSpeechBubbleLayout());

		this.wrap.appendChild(this.char);
		this.el.appendChild(this.shadow);
		this.el.appendChild(this.wrap);
		this.el.addEventListener('click', (event) => {
			if (typeof this.options.onClick === 'function') this.options.onClick(event, this);
		});
		
		// Speech bubble container (inside ui element, next to character)
		this.speechBubble = document.createElement('div');
		this.speechBubble.className = 'ui__speech-bubble';
		this.speechBubble.innerHTML = '<button type="button" class="ui__speech-close" aria-label="Close speech bubble">×</button><p></p>';
		this.speechBubble.style.display = 'none';
		this.target.appendChild(this.speechBubble);
		this.speechBubble.addEventListener('click', () => {
			if (this.options.speechBubbleClosable) this.silence();
		});

		this.target.appendChild(this.el);

		this.setSize(this.options.size, this.options.shadowSize);
		this.setVariant(this.options.variant);
		this.setState(this.options.state);
		this.setFlipX(this.options.flipX);
		this._updateSpeechBubblePosition();
		this._applySpeechBubbleSizing();
		this._boundUpdateSpeechBubbleLayout = () => this._updateSpeechBubbleLayout();
		window.addEventListener('resize', this._boundUpdateSpeechBubbleLayout);
		window.addEventListener('scroll', this._boundUpdateSpeechBubbleLayout, { passive: true });
		requestAnimationFrame(() => this._updateSpeechBubbleLayout());
		setTimeout(() => this._updateSpeechBubbleLayout(), 0);
	}

	_resolveVariantPath(variant) {
		const map = {
			default: 'ui-default.png',
			tablet: 'ui-tablet.png',
			timer: 'ui-timer.png',
			agreement: 'ui-agreement.png',
			celebrate: 'ui-celebrate.png',
			celebrate2: 'ui-celebrate2.png',
			clipboard: 'ui-clipboard.png',
			confused: 'ui-confused.png',
			drink: 'ui-drink.png',
			sandtimer: 'ui-sandtimer.png',
			wave: 'ui-wave.png',
			call: 'ui-call.png',
			reading: 'ui-reading.png',
			school: 'ui-school.png',
			sleeping: 'ui-sleeping.png',
			thinking: 'ui-thinking.png',
			work: 'ui-work.png'
		};
		return `${this.options.assetBase}/${map[variant] || map.default}`;
	}

	setVariant(variant = 'default') {
		this.options.variant = variant;
		this.char.src = this._resolveVariantPath(variant);
		this.shadow.src = `${this.options.assetBase}/shadow.png`;
		this.el.dataset.variant = variant;
	}

	setState(state = 'idle') {
		['idle', 'attention', 'think', 'celebrate', 'wave', 'point', 'sleepy', 'confused'].forEach(s => this.el.classList.remove(`ui--${s}`));
		this.options.state = state;
		if (state !== 'idle') this.el.classList.add(`ui--${state}`);
		this.el.dataset.state = state;
	}

	setSize(size, shadowSize = Math.round(size * 0.61)) {
		this.options.size = size;
		this.options.shadowSize = shadowSize;
		this.el.style.setProperty('--ui-size', `${size}px`);
		this.el.style.setProperty('--ui-shadow-size', `${shadowSize}px`);
		this._updateSpeechBubbleLayout();
	}

	/**
	 * Show a speech bubble with a message
	 * @param {string} message - The message to display
	 * @param {number} duration - Auto-hide after ms (0 = manual hide)
	 */
	say(message, duration = 0) {
		const p = this.speechBubble.querySelector('p');
		if (p) p.textContent = message;
		this.speechBubble.style.display = 'block';
		
		if (duration > 0) {
			clearTimeout(this._speechTimeout);
			this._speechTimeout = setTimeout(() => {
				this.silence();
			}, duration);
		}
	}

	/**
	 * Hide the speech bubble
	 */
	silence() {
		this.speechBubble.style.display = 'none';
		clearTimeout(this._speechTimeout);
	}

	/**
	 * Set speech bubble position
	 * @param {string} position - 'left' or 'right'
	 */
	setSpeechBubblePosition(position) {
		this.options.speechBubblePosition = position;
		this._updateSpeechBubblePosition();
	}


	_applySpeechBubbleSizing() {
		if (!this.speechBubble) return;
		const min = Number(this.options.speechBubbleMinWidth || 0);
		const max = Number(this.options.speechBubbleMaxWidth || 0);
		this.speechBubble.style.minWidth = min > 0 ? `${min}px` : '';
		this.speechBubble.style.maxWidth = max > 0 ? `${max}px` : '';
		this.speechBubble.classList.toggle('ui__speech-bubble--closable', !!this.options.speechBubbleClosable);
	}

	setSpeechBubbleSize({ minWidth, maxWidth } = {}) {
		if (typeof minWidth !== 'undefined') this.options.speechBubbleMinWidth = minWidth;
		if (typeof maxWidth !== 'undefined') this.options.speechBubbleMaxWidth = maxWidth;
		this._applySpeechBubbleSizing();
		this._updateSpeechBubbleLayout();
	}

	setSpeechBubbleClosable(closable = true) {
		this.options.speechBubbleClosable = !!closable;
		this._applySpeechBubbleSizing();
	}

	_updateSpeechBubblePosition() {
		this.speechBubble.classList.remove('ui__speech-bubble--left', 'ui__speech-bubble--right');
		this.speechBubble.classList.add(`ui__speech-bubble--${this.options.speechBubblePosition}`);
		this._updateSpeechBubbleLayout();
	}

	_updateSpeechBubbleLayout() {
		if (!this.speechBubble) return;
		const wasHidden = this.speechBubble.style.display === 'none';
		if (wasHidden) {
			this.speechBubble.style.visibility = 'hidden';
			this.speechBubble.style.display = 'block';
		}

		const rect = this.el.getBoundingClientRect();
		const gap = 14;
		const viewportPad = 24;
		const bubbleRect = this.speechBubble.getBoundingClientRect();
		const bubbleHeight = bubbleRect.height || 80;
		const bubbleWidth = bubbleRect.width || Number(this.options.speechBubbleMaxWidth || 260);
		const top = Math.min(
			window.innerHeight - bubbleHeight - viewportPad,
			Math.max(viewportPad, rect.top + (rect.height * 0.28) - (bubbleHeight / 2))
		);

		this.speechBubble.style.top = `${top}px`;
		this.speechBubble.style.bottom = 'auto';
		this.speechBubble.style.left = 'auto';
		this.speechBubble.style.right = 'auto';

		if (this.options.speechBubblePosition === 'right') {
			const left = Math.min(window.innerWidth - bubbleWidth - viewportPad, rect.right + gap);
			this.speechBubble.style.left = `${left}px`;
		} else {
			const left = Math.max(viewportPad, rect.left - bubbleWidth - gap);
			this.speechBubble.style.left = `${left}px`;
		}

		if (wasHidden) {
			this.speechBubble.style.display = 'none';
			this.speechBubble.style.visibility = '';
		}
	}



	setFlipX(flip = true) {
		this.options.flipX = !!flip;
		this.el.classList.toggle('ui--flip-x', !!flip);
	}


	getState() {
		return {
			variant: this.options.variant,
			state: this.options.state,
			size: this.options.size,
			shadowSize: this.options.shadowSize,
			alt: this.options.alt,
			assetBase: this.options.assetBase,
			speechBubblePosition: this.options.speechBubblePosition,
			speechBubbleMinWidth: this.options.speechBubbleMinWidth,
			speechBubbleMaxWidth: this.options.speechBubbleMaxWidth,
			speechBubbleClosable: this.options.speechBubbleClosable,
			flipX: !!this.options.flipX,
			speechBubbleVisible: this.speechBubble?.style.display !== 'none',
			speechBubbleText: this.speechBubble?.querySelector('p')?.textContent || '',
			hasOnClick: typeof this.options.onClick === 'function'
		};
	}

	setOnClick(handler) {
		this.options.onClick = typeof handler === 'function' ? handler : null;
	}

	mount(target) {
		const newTarget = typeof target === 'string' ? document.querySelector(target) : target;
		if (!newTarget) throw new Error('UiMascot mount target not found');
		newTarget.appendChild(this.el);
		this.target = newTarget;
	}

	destroy() {
		this.silence();
		this.el.remove();
	}
}