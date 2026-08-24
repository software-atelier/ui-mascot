# UI-Mascot Library

![ui-default.png](assets/ui-default.png)

Dieses Paket enthält UI-Mascot als kleine, einbindbare UI-Library mit relativen Pfaden.

## Dateien

- `ui.js` – die Library (ES Module)
- `ui.css` – Basis-Styles
- `demo.html` – interaktive Demo
- `assets/` – alle Varianten

### Verfügbare Varianten

| Variante | Datei | Beschreibung |
|----------|-------|--------------|
| `default` | ui-default.png | Standard-UI-Mascot |
| `tablet` | ui-tablet.png | UI-Mascot mit Tablet |
| `timer` | ui-timer.png | UI-Mascot mit Stoppuhr |
| `agreement` | ui-agreement.png | UI-Mascot mit Agreement/Dokument |
| `celebrate` | ui-celebrate.png | feiernder UI-Mascot |
| `celebrate2` | ui-celebrate2.png | zweite Feier-Variante |
| `clipboard` | ui-clipboard.png | UI-Mascot mit Clipboard |
| `confused` | ui-confused.png | verwirrter UI-Mascot |
| `drink` | ui-drink.png | UI-Mascot mit Getränk |
| `sandtimer` | ui-sandtimer.png | UI-Mascot mit Sanduhr |
| `wave` | ui-wave.png | winkender UI-Mascot |
| `call` | ui-call.png | UI-Mascot beim Telefonieren |
| `reading` | ui-reading.png | UI-Mascot beim Lesen |
| `school` | ui-school.png | UI-Mascot in der Schule |
| `sleeping` | ui-sleeping.png | schlafender UI-Mascot |
| `thinking` | ui-thinking.png | nachdenklicher UI-Mascot |
| `work` | ui-work.png | UI-Mascot bei der Arbeit |
| `shadow.png` | Schatten | (wird automatisch geladen) |

## Beispiel

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
Wählt eine UI-Mascot-Variante:

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
Setzt den visuellen Zustand:

```js
ui.setState('idle');        // sanftes Schweben
ui.setState('attention');   // aufmerksam, nickend
ui.setState('think');       // nachdenklich
ui.setState('celebrate');   // feiern, hüpfen
ui.setState('wave');        // winken
ui.setState('point');       // zeigen
ui.setState('sleepy');      // müde, ruhig
ui.setState('confused');    // verwirrt
```

### setSize(size, shadowSize?)
Passt die Grösse an:

```js
ui.setSize(140);           // nur Hauptgrösse
ui.setSize(140, 86);       // Hauptgrösse + Schatten
```

### mount(target)
Verschiebt den UI-Mascot in ein anderes Element:

```js
ui.mount('#anderer-slot');
```

### destroy()
Entfernt den UI-Mascot vollständig:

```js
ui.destroy();
```

### say(message, duration?)
Zeigt eine Sprechblase mit einer Nachricht:

```js
ui.say('Hallo! 👋');           // Sprechblase anzeigen
ui.say('Hilfe!', 5000);        // Sprechblase, auto-hide nach 5s
```

### silence()
Versteckt die Sprechblase:

```js
ui.silence();
```

### setSpeechBubblePosition(position)
Position der Sprechblase ('left' oder 'right'):

```js
ui.setSpeechBubblePosition('left');   // Links von UI-Mascot
ui.setSpeechBubblePosition('right');  // Rechts von UI-Mascot
```

### setSpeechBubbleSize({ minWidth, maxWidth })
Breite der Sprechblase anpassen:

```js
ui.setSpeechBubbleSize({ minWidth: 180, maxWidth: 280 });
```

### setSpeechBubbleClosable(closable)
Schliessen per Klick auf die ganze Sprechblase aktivieren:

```js
ui.setSpeechBubbleClosable(true);
```

### setOnClick(handler)
Callback registrieren, der bei Klick auf UI-Mascot ausgelöst wird:

```js
ui.setOnClick((event, ui) => {
  console.log('UI-Mascot geklickt');
});
```

### setFlipX(flip)
Spiegelt UI-Mascot horizontal an der vertikalen Achse:

```js
ui.setFlipX(true);  // schaut in die andere Richtung
ui.setFlipX(false); // normal
```

### getState()
Liest den aktuellen Zustand von UI-Mascot aus:

```js
const state = ui.getState();
console.log(state.variant, state.state, state.flipX);
```

Enthält u. a.: `variant`, `state`, `size`, `shadowSize`, `speechBubblePosition`, `speechBubbleMinWidth`, `speechBubbleMaxWidth`, `speechBubbleClosable`, `flipX`, `speechBubbleVisible`, `speechBubbleText`, `hasOnClick`.

## Optionen

Bei der Initialisierung:

```js
new UiMascot('#slot', {
	assetBase: './assets',   // Basispfad zu den Bildern
	variant: 'default',      // Startvariante
	state: 'idle',           // Startzustand
	size: 140,               // Hauptgrösse in px
	shadowSize: 86,          // Schattengrösse in px
	alt: 'UI-Mascot',            // Alt-Text für Barrierefreiheit
	speechBubblePosition: 'left',  // Sprechblase: 'left' oder 'right'
	speechBubbleMinWidth: 150,     // Mindestbreite der Sprechblase
	speechBubbleMaxWidth: 320,     // Maximalbreite der Sprechblase
	speechBubbleClosable: false,  // Ganze Bubble klickbar zum Schliessen
	onClick: (event, ui) => {}, // Callback bei Klick auf UI-Mascot
	flipX: false                 // UI-Mascot horizontal spiegeln
});
```

## Demo starten

Einfach `demo.html` im Browser öffnen — keine Build-Schritte nötig.
