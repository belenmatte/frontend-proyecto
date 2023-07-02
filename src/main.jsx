import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router';
import AuthProvider from './auth/AuthProvider';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <App />
  //</React.StrictMode>,
)
