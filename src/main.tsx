import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5251/api";
axios.defaults.withCredentials = true;
createRoot(document.getElementById('root')!).render(

    <App />

)
