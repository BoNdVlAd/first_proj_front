import React from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthProvider } from './pages/AuthProvider'

function App() {
    return (
        <div className="App">
            <div id="detail">
                <AuthProvider>
                    <Outlet />
                </AuthProvider>
            </div>
        </div>
    )
}

export default App
