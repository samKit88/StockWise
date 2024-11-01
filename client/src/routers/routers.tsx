import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import ProtectedRoutes from '../Layout/ProtectedRoutes'
import Trading from '../pages/Trading'
import PublicRoutes from '../Layout/PublicRoutes'
import Product from '../pages/Product'
import About from '../pages/About'
import Info from '../pages/Info'
import Partner from '../pages/Partner'
import Sales from '../pages/Sales'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/info',
    element: <Info />,
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: '/signin',
        element: <Signin />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'trading',
            element: <Trading />,
          },
          {
            path: 'product',
            element: <Product />,
          },
          {
            path: 'partner',
            element: <Partner />,
          },
          {
            path: 'sales',
            element: <Sales />,
          },
        ],
      },
    ],
  },
])

export default router
