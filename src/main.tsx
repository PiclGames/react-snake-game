import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SnakeGame from "./components/SnakeGame";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SnakeGame />
  </React.StrictMode>,
)
