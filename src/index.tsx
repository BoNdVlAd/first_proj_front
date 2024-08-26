import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import NotFound from "./pages/NotFound";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MenuPage from "./pages/MenuPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: 'home',
                element: <HomePage />,
            },
            {
                path: "auth/login",
                element: <LoginPage />,
            },
            {
                path: "auth/registration",
                element: <RegistrationPage />,
            },
            {
                path: "menu",
                element: <MenuPage />,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <Suspense fallback={<div>...Loading</div>}>
            <RouterProvider router={router} />
        </Suspense>
    </React.StrictMode>,
);

reportWebVitals();
