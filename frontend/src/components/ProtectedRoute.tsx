import React from "react";
import { Navigate } from "react-router-dom";
import { AppUserContextInterface } from "../contexts/CurrentUserContext";

export interface ProtectedRoute {
  user: AppUserContextInterface;
  children?: React.ReactNode;
}

const ProtectedRoute = (props: ProtectedRoute) => {
  return (
    <React.Fragment>
      {(props.user.name !== "" && props.user.about !== "") ? ( props.children ) :
      (<Navigate to="/sign-in" replace />)}
    </React.Fragment>
  );
};

export default ProtectedRoute;
