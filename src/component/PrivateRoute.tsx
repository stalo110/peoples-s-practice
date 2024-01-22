/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Outlet, useLocation } from "react-router";
import { Navigate } from "react-router-dom";

interface Props {
  activeUser: any;
}

const PrivateRoute: FC<Props> = ({ activeUser }) => {
  const location = useLocation();
  return activeUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
  //   );
};

export default PrivateRoute;
