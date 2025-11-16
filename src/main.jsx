import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './components/Layout/Root';
import Banner from './components/Banner/Banner';
import ReportIssue from './components/ReportIssue/ReportIssue';
import Home from './components/Home/Home';
import RecentComplain from './components/RecentComplain/RecentComplain';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AllIssues from './components/AllIssues/AllIssues';
import MyIssues from './components/MyIssues/MyIssues';
import MyContribution from './components/MyContribution/MyContribution';
import AddIssue from './components/AddIssue/AddIssue';
import IssueDetails from './components/IssueDetails/IssueDetails';
import AuthProvider from './context/AuthProvider/AuthProvider';
import PrivateRoute from './Routes/PrivateRoute';
import Profile from './components/Profile/Profile';
import UpdateIssue from './components/AddIssue/UpdateIssue';
import Error from './components/Error/Error'; 

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'reportIssue',
        Component: ReportIssue
      },
      {
        path: 'recentComplain',
        Component: RecentComplain
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'all-issues',
        Component: AllIssues
      },
      {
        path: 'my-issues',
        element:<PrivateRoute>
          <MyIssues></MyIssues>
        </PrivateRoute>
      },
      {
        path: 'my-contribution',
        element:<PrivateRoute>
        <MyContribution></MyContribution>
      </PrivateRoute>
      },
      {
        path: 'add-issue',
        Component: AddIssue
      },
      ,
      {
        path: 'edit-issue/:id',
        Component: UpdateIssue
      },
      {
        path: 'see-details/:id',
        element:<PrivateRoute>
          <IssueDetails></IssueDetails>
        </PrivateRoute> 
      },
      {
        path: 'profile',
        element: <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={router}></RouterProvider>
   </AuthProvider>
  </StrictMode>,
)
