import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'

const ProtectedRoutes = () => {
  const auth = useSelector((state: RootState) => state.auth)

  if (!auth.user) {
    return <Navigate to={'/signin'} />
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`
  return <Outlet />
}

export default ProtectedRoutes
