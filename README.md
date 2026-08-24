# UI-Mascot Library

![ui-default.png](assets/ui-default.png)

This package contains UI-Mascot, a small, embeddable UI library with relative paths.

## Files

- `ui.js` – the library (ES module)
- `ui.css` – base styles
- `demo.html` – interactive demo
- `assets/` – all variants

### Available Variants

| Variant | File | Description |
|----------|-------|--------------|
| `default` | ui-default.png | Standard UI mascot |
| `tablet` | ui-tablet.png | UI mascot with tablet |
| `timer` | ui-timer.png | UI mascot with stopwatch |
| `agreement` | ui-agreement.png | UI mascot with agreement/document |
| `celebrate` | ui-celebrate.png | celebrating UI mascot |
| `celebrate2` | ui-celebrate2.png | second celebration variant |
| `clipboard` | ui-clipboard.png | UI mascot with clipboard |
| `confused` | ui-confused.png | confused UI mascot |
| `drink` | ui-drink.png | UI mascot with a drink |
| `sandtimer` | ui-sandtimer.png | UI mascot with hourglass |
| `wave` | ui-wave.png | waving UI mascot |
| `call` | ui-call.png | UI mascot on the phone |
| `reading` | ui-reading.png | UI mascot reading |
| `school` | ui-school.png | UI mascot at school |
| `sleeping` | ui-sleeping.png | sleeping UI mascot |
| `thinking` | ui-thinking.png | pensive UI mascot |
| `work` | ui-work.png | UI mascot at work |
| `shadow.png` | Shadow | (loaded automatically) |

## Example

```html
<link rel="stylesheet" href="./ui.css" />
<div id="slot"></div>
<script type="module">
	import { UiMascot } from './ui.js';

	const ui = new UiMascot('#slot', {
		assetBase: './assets',
		variant: 'default',
		state: 'idle',
		size: 140,
		shadowSize: 86
	});
</script>
```

## API

### setVariant(variant)
Selects a UI mascot variant:

```js
ui.setVariant('default');
ui.setVariant('tablet');
ui.setVariant('timer');
ui.setVariant('agreement');
ui.setVariant('celebrate');
ui.setVariant('celebrate2');
ui.setVariant('clipboard');
ui.setVariant('confused');
ui.setVariant('drink');
ui.setVariant('sandtimer');
ui.setVariant('wave');
ui.setVariant('call');
ui.setVariant('reading');
ui.setVariant('school');
ui.setVariant('sleeping');
ui.setVariant('thinking');
ui.setVariant('work');
```

### setState(state)
Sets the visual state:

```js
ui.setState('idle');        // gentle floating
ui.setState('attention');   // attentive, nodding
ui.setState('think');       // thoughtful
ui.setState('celebrate');   // celebrate, hop
ui.setState('wave');        // wave
ui.setState('point');       // point
ui.setState('sleepy');      // tired, calm
ui.setState('confused');    // confused
```

### setSize(size, shadowSize?)
Adjusts the size:

```js
ui.setSize(140);           // main size only
ui.setSize(140, 86);       // main size + shadow
```

### mount(target)
Moves the UI mascot into another element:

```js
ui.mount('#other-slot');
```

### destroy()
Removes the UI mascot completely:

```js
ui.destroy();
```

### say(message, duration?)
Shows a speech bubble with a message:

```js
ui.say('Hello! 👋');           // show speech bubble
ui.say('Help!', 5000);        // speech bubble, auto-hide after 5s
```

### silence()
Hides the speech bubble:

```js
ui.silence();
```

### setSpeechBubblePosition(position)
Position of the speech bubble ('left' or 'right'):

```js
ui.setSpeechBubblePosition('left');   // Left of the UI mascot
ui.setSpeechBubblePosition('right');  // Right of the UI mascot
```

### setSpeechBubbleSize({ minWidth, maxWidth })
Adjusts the width of the speech bubble:

```js
ui.setSpeechBubbleSize({ minWidth: 180, maxWidth: 280 });
```

### setSpeechBubbleClosable(closable)
Enables closing by clicking anywhere on the whole speech bubble:

```js
ui.setSpeechBubbleClosable(true);
```

### setOnClick(handler)
Registers a callback triggered when clicking the UI mascot:

```js
ui.setOnClick((event, ui) => {
  console.log('UI mascot clicked');
});
```

### setFlipX(flip)
Mirrors the UI mascot horizontally:

```js
ui.setFlipX(true);  // faces the other direction
ui.setFlipX(false); // normal
```

### getState()
Reads the current state of the UI mascot:

```js
const state = ui.getState();
console.log(state.variant, state.state, state.flipX);
```

Includes among others: `variant`, `state`, `size`, `shadowSize`, `speechBubblePosition`, `speechBubbleMinWidth`, `speechBubbleMaxWidth`, `speechBubbleClosable`, `flipX`, `speechBubbleVisible`, `speechBubbleText`, `hasOnClick`.

## Options

At initialization:

```js
new UiMascot('#slot', {
	assetBase: './assets',   // base path to the images
	variant: 'default',      // starting variant
	state: 'idle',           // starting state
	size: 140,               // main size in px
	shadowSize: 86,          // shadow size in px
	alt: 'UI-Mascot',            // alt text for accessibility
	speechBubblePosition: 'left',  // speech bubble: 'left' or 'right'
	speechBubbleMinWidth: 150,     // minimum width of the speech bubble
	speechBubbleMaxWidth: 320,     // maximum width of the speech bubble
	speechBubbleClosable: false,  // whole bubble clickable to close
	onClick: (event, ui) => {}, // callback when clicking the UI mascot
	flipX: false                 // mirror the UI mascot horizontally
});
```

## Running the Demo

Just open `demo.html` in your browser — no build steps required.
