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
import FacultyLogin from './pages/faculty/FacultyLogin.jsx'
import FacultyRequiredPasswordChange from './pages/faculty/FacultyRequiredPasswordChange.jsx'
import FacultyForgotPassword from './pages/faculty/FacultyForgotPassword.jsx'
import FacultyOtpLogin from './pages/faculty/FacultyOtpLogin.jsx'
import FacultyChangePassword from './pages/faculty/FacultyChangePassword.jsx'
import AdminViewShift from './pages/admin/login/AdminViewShift.jsx'
import AcademicYear from './pages/admin/login/AcademicYear.jsx'
import SelectAcademicYearSemester from './pages/admin/login/SelectAcademicYearSemester.jsx'
import AddAdmin from './pages/admin/login/AddAdmin.jsx'
import FacultyCheckClass from './pages/faculty/FacultyCheckClass.jsx'

import PrincipalAcademicYear from './pages/principal/PrincipalAcademicYear.jsx'
import PrincipalChangePassword from './pages/principal/PrincipalChangePassword.jsx'
import PrincipalChatbot from './pages/principal/PrincipalChatbot.jsx'
import PrincipalDashboard from './pages/principal/PrincipalDashboard.jsx'
import PrincipalErrorPage from './pages/principal/PrincipalErrorPage.jsx'
import PrincipalForgotPassword from './pages/principal/PrincipalForgotPassword.jsx'
import PrincipalHomePage from './pages/principal/PrincipalHomePage.jsx'
import PrincipalImportGoogleSheets from './pages/principal/PrincipalImportGoogleSheets.jsx'
import PrincipalLogin from './pages/principal/PrincipalLogin.jsx'
import PrincipalOtpLogin from './pages/principal/PrincipalOtpLogin.jsx'
import PrincipalSearchFaculty from './pages/principal/PrincipalSearchFaculty.jsx'
import PrincipalSearchStudent from './pages/principal/PrincipalSearchStudent.jsx'
import PrincipalSelectAcademicYearSemester from './pages/principal/PrincipalSelectAcademicYearSemester.jsx'
import PrincipalSidebar from './pages/principal/PrincipalSidebar.jsx'
import PrincipalViewShift from './pages/principal/PrincipalViewShift.jsx'
import PrincipalViewTimetable from './pages/principal/PrincipalViewTimetable.jsx'
import PrincipalViewStudents from './pages/principal/PrincipalViewStudents.jsx'
import AddPrincipal from './pages/admin/login/AddPrincipal.jsx'
import AdminViewClassLocation from './pages/admin/login/AdminViewClassLocation.jsx'
import PrincipalViewClassLocation from './pages/principal/PrincipalViewClassLocation.jsx'
import FacultyViewClassLocation from './pages/faculty/FacultyViewClassLocation.jsx'
import AddStudent from './pages/admin/login/AddStudent.jsx'
import UpdateStudent from './pages/admin/login/UpdateStudent.jsx'
import AddFaculty from './pages/admin/login/AddFaculty.jsx'
import UpdateFaculty from './pages/admin/login/UpdateFaculty.jsx'
import AddTimetable from './pages/admin/login/AddTimetable.jsx'
import UpdateTimetable from './pages/admin/login/UpdateTimetable.jsx'


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
    path: "/faculty/login",
    element: <FacultyLogin/>
  },
  {
    path: "/faculty/require",
    element: <FacultyRequiredPasswordChange/>
  },
  {
    path: "/faculty/forgot-password",
    element: <FacultyForgotPassword/>
  },
  {
    path: "/faculty/otp",
    element: <FacultyOtpLogin/>
  },
  {
    path: "/faculty/reset-password",
    element: <FacultyChangePassword/>
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
        path: "/admin/view-class-location",
        element: <AdminViewClassLocation/>
      },
      {
        path: "/admin/view-shift",
        element: <AdminViewShift/>
      },
      {
        path: "/admin/add-academic-year",
        element: <AcademicYear/>
      },
      {
        path: "/admin/select-academic-year",
        element: <SelectAcademicYearSemester/>
      },
      {
        path: "/admin/manage-students",
        element: <ManageStudents/>
      },
      {
        path: "/admin/manage-faculties",
        element: <ManageFaculties/>
      },
      {
        path: "/admin/manage-timetables",
        element: <ManageTimetable/>
      },
      {
        path: "/admin/add-timetable",
        element: <AddTimetable/>
      },
      {
        path: "/admin/add-admin",
        element: <AddAdmin/>
      },
      {
        path: "/admin/add-student",
        element: <AddStudent/>
      },
      {
        path: "/admin/add-faculty",
        element: <AddFaculty/>
      },
      {
        path: "/admin/update-student",
        element: <UpdateStudent/>
      },
      {
        path: "/admin/update-faculty",
        element: <UpdateFaculty/>
      },
      {
        path: "/admin/update-timetable",
        element: <UpdateTimetable/>
      },
      {
        path: "/admin/add-principal",
        element: <AddPrincipal/>
      },
      {
        path: "/admin/import-google-sheets",
        element: <ImportGoogleSheets/>
      }
    ]
  },
  {
    path: "principal/login",
    element: <PrincipalLogin/>
  },
  {
    path: "principal/forgot-password",
    element: <PrincipalForgotPassword/>
  },
  {
    path: "principal/otp",
    element: <PrincipalOtpLogin/>
  },
  {
    path: "principal/reset-password",
    element: <PrincipalChangePassword/>
  },
  {
    path: "/principal",
    element: <PrincipalDashboard/>,
    errorElement: <PrincipalErrorPage/>,
    children: [
      {
        path: "/principal",
        element: <PrincipalHomePage/>
      },
      {
        path: "/principal/search-faculty",
        element: <PrincipalSearchFaculty/>
      },
      {
        path: "/principal/search-student",
        element: <PrincipalSearchStudent/>
      },
      {
        path: "/principal/view-timetable",
        element: <PrincipalViewTimetable/>
      },
      {
        path: "/principal/view-class-location",
        element: <PrincipalViewClassLocation/>
      },
      {
        path: "/principal/view-shift",
        element: <PrincipalViewShift/>
      },
      // {
      //   path: "/principal/add-academic-year",
      //   element: <PrincipalAcademicYear/>
      // },
      // {
      //   path: "/principal/select-academic-year",
      //   element: <PrincipalSelectAcademicYearSemester/>
      // },
      // {
      //   path: "/principal/import-google-sheets",
      //   element: <PrincipalImportGoogleSheets/>
      // }
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
        path: "/faculty/check-class-availability",
        element: <FacultyCheckClass/>
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
        path: "/faculty/view-class-location",
        element: <FacultyViewClassLocation/>
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
