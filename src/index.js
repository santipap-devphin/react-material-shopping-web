import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StyledEngineProvider } from '@mui/material/styles';
import "swiper/css/bundle";

ReactDOM.render(
  <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

