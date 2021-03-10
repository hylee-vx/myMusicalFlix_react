import React from 'react';
import ReactDOM from 'react-dom';

import MainView from './components/mainview/MainView';

//import statement to indicate need to bundle index.scss
import './index.scss';

//main component
class MyMusicalFlix extends React.Component {
    render() {
        return <MainView />;
    }
}

//tells React to render app in the root DOM element
ReactDOM.render(<MyMusicalFlix />, document.getElementById('root'));