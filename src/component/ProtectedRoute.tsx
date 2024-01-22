/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { FC } from "react";
// import { Outlet, useLocation } from "react-router";
// import { Navigate } from "react-router-dom";

// interface Props {
//   activeUser: any;
// }

// const ProtectedRoute: FC<Props> = ({ activeUser }) => {
//   const location = useLocation();
//   return !activeUser ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/dashboard" state={{ from: location }} />
//   );
//   //   );
// };

// export default ProtectedRoute;

import React from 'react'

const ProtectedRoute = () => {
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute
