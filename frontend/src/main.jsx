import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

fetch('/api')
    .then(res => res.json())
    .then(data => console.log('API ok: ', data))
    .catch(err => console.error('API error: ', err))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)