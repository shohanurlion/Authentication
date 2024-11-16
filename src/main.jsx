import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Commponet/Root/Root.jsx';
import Home from './Commponet/Home/Home.jsx';
import About from './Commponet/About/About.jsx';
import Singup from './Commponet/Singup/Singup.jsx';
import Login from './Commponet/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element:<Root></Root>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/about',
        element:<About></About>
      },
      {
        path:'/singup',
        element:<Singup></Singup>
      },
      {
        path:'/login',
        element:<Login></Login>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={router} />
  </StrictMode>,
)
