import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../store/store'

const PublicRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  if (user) {
    return <Navigate to="./dashboard" />
  }

  return <Outlet />
}

export default PublicRoutes
