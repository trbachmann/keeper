import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

const devTools = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, devTools);
const provider = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(provider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
