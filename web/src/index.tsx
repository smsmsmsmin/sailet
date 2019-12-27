import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './client/Root';
import './styles/fonts/fonts.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
