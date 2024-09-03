import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MenuPage from './pages/MenuPage'
import PrivateRoute from './pages/PrivateRouter'
import { AuthProvider } from './pages/AuthProvider'
import DishFullPage from './pages/DishFullPage'
import ManagePage from './pages/ManagePage'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import CartPage from './pages/CartPage'
import PaymentPage from './pages/PaymentPage'
import TwoFactorAuthPage from './pages/TwoFactorAuthPage'
import ProfilePage from './pages/ProfilePage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

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
                path: 'auth/login',
                element: <LoginPage />,
            },
            {
                path: 'auth/registration',
                element: <RegistrationPage />,
            },
            {
                path: 'menu',
                element: (
                    <PrivateRoute>
                        <MenuPage />,
                    </PrivateRoute>
                ),
            },
            {
                path: 'dishes/:id',
                element: <DishFullPage />,
            },
            {
                path: 'manage_orders',
                element: <ManagePage />,
            },
            {
                path: 'cart',
                element: <CartPage />,
            },
            {
                path: 'payment/:id',
                element: <PaymentPage />,
            },
            {
                path: 'two_factor_auth',
                element: <TwoFactorAuthPage />,
            },
            {
                path: 'profile',
                element: <ProfilePage />,
            },
        ],
    },
])

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <AuthProvider>
                <Suspense fallback={<div>...Loading</div>}>
                    <RouterProvider router={router} />
                </Suspense>
            </AuthProvider>
        </React.StrictMode>
    </Provider>
)

reportWebVitals()
