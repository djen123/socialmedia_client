import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useSelector((state) => state.auth)

  if(loading) {
    return (
        <div className='text-center'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
  }

  if(!currentUser) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute