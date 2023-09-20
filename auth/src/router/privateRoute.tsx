import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useStateData from "../global/jotai";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const [userState] = useStateData();
  console.log("reading State: ", userState);

  const [state, setState] = useState(JSON.parse(localStorage.getItem("view")!));

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("view")!));
  });

  console.log("Please show: ", state);

  return (
    <div>{state ? <div>{children}</div> : <Navigate to="/sign-in" />}</div>
  );
};

export default PrivateRoute;
