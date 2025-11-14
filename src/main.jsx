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
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
