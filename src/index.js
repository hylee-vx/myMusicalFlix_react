import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/mainview/MainView';
import moviesApp from './reducers';

//import statement to indicate need to bundle index.scss
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

//main component
const MyMusicalFlix = () => {
    return (
        <Provider store={store}>
            <MainView />
        </Provider>
    );
}

//tells React to render app in the root DOM element
ReactDOM.render(<MyMusicalFlix />, document.getElementById('root'));