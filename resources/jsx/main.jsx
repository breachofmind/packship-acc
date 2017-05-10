import React from 'react'
import store from '../js/store'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import PackShipApplication from './PackShipApplication.jsx'

const render = (Component => {
    // This method links the DOM with React's virtual DOM.
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component/>
            </AppContainer>
        </Provider>,

        // This is the application's root element.
        document.getElementById('PackShipApplicationRoot')
    );

});

render(PackShipApplication);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./PackShipApplication.jsx', () => {
        render(PackShipApplication);
    });
}