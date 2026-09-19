import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'

function PublicOnlyRoute({ children }) {
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

  if(currentUser) {
    return <Navigate to="/feed" />
  }

  return children
}

export default PublicOnlyRoute