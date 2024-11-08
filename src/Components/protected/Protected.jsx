import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const Protected = ({ isSignedIn }) => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>;
};

Protected.propTypes = {
  isSignedIn: PropTypes.bool,
};

export default Protected;