import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Games from './components/App-Games';
import GameMain from './components/GameMain';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <App />
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<App />} />
  //     <Route path="games" element={<Games />} />
  //     <Route path="games/audio" element={<GameMain gameName="audio" />} />
  //     <Route path="games/sprint" element={<GameMain gameName="sprint" />} />
  //   </Routes>
  // </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
