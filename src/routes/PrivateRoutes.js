
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {

  const isAuthenticated = useSelector((state) => state.userAccount.isAuthenticated);


  if(!isAuthenticated) {
    return <>
      <Navigate to='/login'>

      </Navigate>
    </>
  }

  return (
    <>
      {children}
    </>
  )
}

export default PrivateRoutes