/**
 * The entry point for the React application.
 * This code initializes the React app and renders the root component.
 *
 * @module index
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
