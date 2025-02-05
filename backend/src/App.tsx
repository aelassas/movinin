import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalProvider } from '@/context/GlobalContext'
import { UserProvider } from '@/context/UserContext'
import ScrollToTop from '@/components/ScrollToTop'
import NProgressIndicator from '@/components/NProgressIndicator'

const Header = lazy(() => import('@/components/Header'))
const SignIn = lazy(() => import('@/pages/SignIn'))
const Activate = lazy(() => import('@/pages/Activate'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword'))
const SignUp = lazy(() => import('@/pages/SignUp'))
const Agencies = lazy(() => import('@/pages/Agencies'))
const Agency = lazy(() => import('@/pages/Agency'))
const CreateAgency = lazy(() => import('@/pages/CreateAgency'))
const UpdateAgency = lazy(() => import('@/pages/UpdateAgency'))
const Locations = lazy(() => import('@/pages/Locations'))
const CreateLocation = lazy(() => import('@/pages/CreateLocation'))
const UpdateLocation = lazy(() => import('@/pages/UpdateLocation'))
const Properties = lazy(() => import('@/pages/Properties'))
const Property = lazy(() => import('@/pages/Property'))
const PropertyBookings = lazy(() => import('@/pages/PropertyBookings'))
const CreateProperty = lazy(() => import('@/pages/CreateProperty'))
const UpdateProperty = lazy(() => import('@/pages/UpdateProperty'))
const Bookings = lazy(() => import('@/pages/Bookings'))
const UpdateBooking = lazy(() => import('@/pages/UpdateBooking'))
const CreateBooking = lazy(() => import('@/pages/CreateBooking'))
const Users = lazy(() => import('@/pages/Users'))
const User = lazy(() => import('@/pages/User'))
const CreateUser = lazy(() => import('@/pages/CreateUser'))
const UpdateUser = lazy(() => import('@/pages/UpdateUser'))
const Settings = lazy(() => import('@/pages/Settings'))
const Notifications = lazy(() => import('@/pages/Notifications'))
const ToS = lazy(() => import('@/pages/ToS'))
const About = lazy(() => import('@/pages/About'))
const ChangePassword = lazy(() => import('@/pages/ChangePassword'))
const Contact = lazy(() => import('@/pages/Contact'))
const NoMatch = lazy(() => import('@/pages/NoMatch'))
const Countries = lazy(() => import('@/pages/Countries'))
const CreateCountry = lazy(() => import('@/pages/CreateCountry'))
const UpdateCountry = lazy(() => import('@/pages/UpdateCountry'))
const Scheduler = lazy(() => import('@/pages/Scheduler'))

const App = () => (
  <BrowserRouter>
    <GlobalProvider>
      <UserProvider>
        <ScrollToTop />

        <div className="app">
          <Suspense fallback={<NProgressIndicator />}>
            <Header />

            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/activate" element={<Activate />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/" element={<Bookings />} />
              <Route path="/agencies" element={<Agencies />} />
              <Route path="/agency" element={<Agency />} />
              <Route path="/create-agency" element={<CreateAgency />} />
              <Route path="/update-agency" element={<UpdateAgency />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/create-location" element={<CreateLocation />} />
              <Route path="/update-location" element={<UpdateLocation />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property" element={<Property />} />
              <Route path="/property-bookings" element={<PropertyBookings />} />
              <Route path="/create-property" element={<CreateProperty />} />
              <Route path="/update-property" element={<UpdateProperty />} />
              <Route path="/update-booking" element={<UpdateBooking />} />
              <Route path="/create-booking" element={<CreateBooking />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user" element={<User />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/update-user" element={<UpdateUser />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/tos" element={<ToS />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/create-country" element={<CreateCountry />} />
              <Route path="/update-country" element={<UpdateCountry />} />
              <Route path="/scheduler" element={<Scheduler />} />

              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Suspense>
        </div>
      </UserProvider>
    </GlobalProvider>
  </BrowserRouter>
)

export default App
