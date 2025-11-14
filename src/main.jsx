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

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
