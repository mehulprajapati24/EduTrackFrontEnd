import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Login from './pages/signin/Login.jsx'
import RequirePasswordChange from './pages/require/RequirePasswordChange.jsx'
import ErrorPage from './pages/error/ErrorPage.jsx'
import Schedule from './pages/schedule/Schedule.jsx'
import Timetable from './pages/timetable/Timetable.jsx'
import Contact from './pages/contact/Contact.jsx'
import FacultyLocation from './pages/faculty_location/FacultyLocation.jsx'
import ForgotPassword from './pages/signin/ForgotPassword.jsx'
import OtpLogin from './pages/signin/OtpLogin.jsx'
import ChangePassword from './pages/signin/ChangePassword.jsx'
import Profile from './pages/profile/Profile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/schedule overview",
        element: <Schedule/>
      },
      {
        path: "/timetable",
        element: <Timetable/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/faculty location",
        element: <FacultyLocation/>
      }
    ]
  },
  {
    path: "login",
    element: <Login/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "require",
    element: <RequirePasswordChange/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "forgot-password",
    element: <ForgotPassword/>
  },
  {
    path: "otp",
    element: <OtpLogin/>
  },
  {
    path: "reset-password",
    element: <ChangePassword/>
  },
  {
    path: "profile",
    element: <Profile/>
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
