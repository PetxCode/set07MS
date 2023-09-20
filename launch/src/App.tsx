import AuthApp from "authApp/App";
import useData from "authApp/MGN";
// import { useRecoilValue } from "recoil";
// import decode from "jwt-decode";
// import { useState } from "react";

const App = () => {
  const [value] = useData();
  console.log("show hard things: ", value);

  // if (value) {
  //   setState(value);
  // }
  // console.log("reading decoded value: ", state);

  // console.log(state);

  return (
    <div>
      <AuthApp />
      <div>Reading: {value}</div>

      <b />
      <b />
      <b />
      <div>{`Peter: ${value}`}</div>
      <b />
      <b />
      <b />
      {/* <div>{`State Record: ${state}`}</div> */}
      <b />
      <b />
      <b />
    </div>
  );
};

export default App;
