import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { userIn, userDetail } from "../global/recoil";
import jwt_decode from "jwt-decode";
import { userStateDetail } from "../global/state";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const userState = useRecoilValue(userIn);
  const [detail, setDetail] = useRecoilState(userDetail);

  const [usersDetail, setUsersDetail] = useRecoilState(userStateDetail);

  if (userState) {
    let data: any = jwt_decode(userState);
    setDetail(data?.id);
    setUsersDetail(data?.id);
  }

  return (
    <div>
      {detail && usersDetail ? (
        <div>{children}</div>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </div>
  );
};

export default PrivateRoute;
