import { h, render } from './vendor/preact.js';
import htm from './vendor/htm.js';
import App from './App.js';

const html = htm.bind(h);

render(h(App, null), document.getElementById('root'));
