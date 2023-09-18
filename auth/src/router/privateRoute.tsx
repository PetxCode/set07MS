import React, { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { user, userDetail } from "../global/recoil";
import jwt_decode from "jwt-decode";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const userState = useRecoilValue(user);
  const [detail, setDetail] = useRecoilState(userDetail);

  if (userState) {
    setDetail(jwt_decode(userState));
  }

  console.log(detail);
  return (
    <div>{detail ? <div>{children}</div> : <Navigate to="/sign-in" />}</div>
  );
};

export default PrivateRoute;
