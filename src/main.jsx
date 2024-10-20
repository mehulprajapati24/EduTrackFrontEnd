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
import AdminLogin from './pages/admin/login/AdminLogin.jsx'
import AdminForgotPassword from './pages/admin/login/AdminForgotPassword.jsx'
import AdminOtpLogin from './pages/admin/login/AdminOtpLogin.jsx'
import AdminChangePassword from './pages/admin/login/AdminChangePassword.jsx'
import AdminDashboard from './pages/admin/login/AdminDashboard.jsx'
import AdminHomePage from './pages/admin/login/AdminHomePage.jsx'
import AdminErrorPage from './pages/admin/login/AdminErrorPage.jsx'
import AdminSearchFaculty from './pages/admin/login/AdminSearchFaculty.jsx'
import ManageFaculties from './pages/admin/login/ManageFaculties.jsx'
import ManageTimetable from './pages/admin/login/ManageTimetable.jsx'
import AdminSearchStudent from './pages/admin/login/AdminSearchStudent.jsx'
import ManageStudents from './pages/admin/login/ManageStudents.jsx'
import ManageClassBatch from './pages/admin/login/ManageClassBatch.jsx'
import FacultyDashboard from './pages/faculty/FacultyDashboard.jsx'
import FacultyHomePage from './pages/faculty/FacultyHomePage.jsx'
import SearchFaculty from './pages/faculty/SearchFaculty.jsx'
import SearchStudent from './pages/faculty/SearchStudent.jsx'
import FacultyTimetable from './pages/faculty/FacultyTimetable.jsx'
import ManageSession from './pages/admin/login/ManageSession.jsx'
import AdminViewTimetable from './pages/admin/login/AdminViewTimetable.jsx'
import ImportGoogleSheets from './pages/admin/login/ImportGoogleSheets.jsx'

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
    path: "admin/login",
    element: <AdminLogin/>
  },
  {
    path: "admin/forgot-password",
    element: <AdminForgotPassword/>
  },
  {
    path: "admin/otp",
    element: <AdminOtpLogin/>
  },
  {
    path: "admin/reset-password",
    element: <AdminChangePassword/>
  },
  {
    path: "/admin",
    element: <AdminDashboard/>,
    errorElement: <AdminErrorPage/>,
    children: [
      {
        path: "/admin",
        element: <AdminHomePage/>
      },
      {
        path: "/admin/search-faculty",
        element: <AdminSearchFaculty/>
      },
      {
        path: "/admin/manage-faculties",
        element: <ManageFaculties/>
      },
      {
        path: "/admin/manage-timetable",
        element: <ManageTimetable/>
      },
      {
        path: "/admin/search-student",
        element: <AdminSearchStudent/>
      },
      {
        path: "/admin/manage-students",
        element: <ManageStudents/>
      },
      {
        path: "/admin/manage-class-batch",
        element: <ManageClassBatch/>
      },
      {
        path: "/admin/manage-session",
        element: <ManageSession/>
      },
      {
        path: "/admin/view-timetable",
        element: <AdminViewTimetable/>
      },
      {
        path: "/admin/import-google-sheets",
        element: <ImportGoogleSheets/>
      }
    ]
  },
  {
    path: "/faculty",
    element: <FacultyDashboard/>,
    children: [
      {
        path: "/faculty",
        element: <FacultyHomePage/>
      },
      {
        path: "/faculty/search-faculty",
        element: <SearchFaculty/>
      },
      {
        path: "/faculty/search-student",
        element: <SearchStudent/>
      },
      {
        path: "/faculty/timetable",
        element: <FacultyTimetable/>
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
