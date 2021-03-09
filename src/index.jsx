import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

//import statement to indicate need to bundle index.scss
import './index.scss';

//main component
class MyMusicalFlix extends React.Component {
    render() {
        return <MainView />;
    }
}

//finds root of app
const container = document.getElementsByClassName('app-container')[0];

//tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyMusicalFlix), container);