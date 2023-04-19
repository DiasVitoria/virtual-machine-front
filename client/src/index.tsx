// import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Roteador from './componentes/Routes/roteador';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<Roteador />)

// ReactDOM.render(
//   <React.StrictMode>
//     <Roteador />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
reportWebVitals();
