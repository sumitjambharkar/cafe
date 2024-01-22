import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/useAuth.jsx'
import {BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <AuthProvider>
  <Router>
  <App />
  </Router>                                 
  </AuthProvider>
  </>,
)
