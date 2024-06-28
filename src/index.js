import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './state/store/store'

// Create a root for ReactDOM to render the app into the 'root' element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='body-bg-color min-h-[100vh] pb-7'>
      <Provider store = {store}> {/* Provide Redux store to the entire app */}
          <App/> {/* Render the main App component */}
      </Provider>
    </div>
  </React.StrictMode>
);

reportWebVitals();
