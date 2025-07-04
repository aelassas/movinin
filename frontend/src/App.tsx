import React, { lazy, Suspense, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import env from '@/config/env.config'
import { NotificationProvider } from '@/context/NotificationContext'
import { UserProvider } from '@/context/UserContext'
import { RecaptchaProvider } from '@/context/RecaptchaContext'
import { PayPalProvider } from '@/context/PayPalContext'
import { init as initGA } from '@/utils/ga4'
import ScrollToTop from '@/components/ScrollToTop'
import NProgressIndicator from '@/components/NProgressIndicator'

if (env.GOOGLE_ANALYTICS_ENABLED) {
  initGA()
}

const Header = lazy(() => import('@/components/Header'))
const SignIn = lazy(() => import('@/pages/SignIn'))
const SignUp = lazy(() => import('@/pages/SignUp'))
const Activate = lazy(() => import('@/pages/Activate'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword'))
const Home = lazy(() => import('@/pages/Home'))
const Search = lazy(() => import('@/pages/Search'))
const Property = lazy(() => import('@/pages/Property'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const CheckoutSession = lazy(() => import('@/pages/CheckoutSession'))
const Bookings = lazy(() => import('@/pages/Bookings'))
const Booking = lazy(() => import('@/pages/Booking'))
const Settings = lazy(() => import('@/pages/Settings'))
const Notifications = lazy(() => import('@/pages/Notifications'))
const ToS = lazy(() => import('@/pages/ToS'))
const About = lazy(() => import('@/pages/About'))
const ChangePassword = lazy(() => import('@/pages/ChangePassword'))
const Contact = lazy(() => import('@/pages/Contact'))
const NoMatch = lazy(() => import('@/pages/NoMatch'))
const Agencies = lazy(() => import('@/pages/Agencies'))
const Locations = lazy(() => import('@/pages/Locations'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'))

const AppLayout = () => {
  const location = useLocation()
  const [refreshKey, setRefreshKey] = useState(0) // refreshKey to check user and notifications when navigating between routes

  useEffect(() => {
    setRefreshKey((prev) => prev + 1)
  }, [location.pathname])

  return (
    <UserProvider refreshKey={refreshKey}>
      <NotificationProvider refreshKey={refreshKey}>
        <RecaptchaProvider>
          <PayPalProvider>
            <ScrollToTop />
            <div className="app">
              <Suspense fallback={<NProgressIndicator />}>
                <Header />
                <Outlet />
              </Suspense>
            </div>
          </PayPalProvider>
        </RecaptchaProvider>
      </NotificationProvider>
    </UserProvider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
      { path: '/activate', element: <Activate /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/reset-password', element: <ResetPassword /> },
      { path: '/search', element: <Search /> },
      { path: '/property', element: <Property /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/checkout-session/:sessionId', element: <CheckoutSession /> },
      { path: '/bookings', element: <Bookings /> },
      { path: '/booking', element: <Booking /> },
      { path: '/settings', element: <Settings /> },
      { path: '/notifications', element: <Notifications /> },
      { path: '/change-password', element: <ChangePassword /> },
      { path: '/about', element: <About /> },
      { path: '/tos', element: <ToS /> },
      { path: '/contact', element: <Contact /> },
      { path: '/agencies', element: <Agencies /> },
      { path: '/destinations', element: <Locations /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/cookie-policy', element: <CookiePolicy /> },
      { path: '*', element: <NoMatch /> }
    ]
  }
])

const App = () => <RouterProvider router={router} />

export default App
