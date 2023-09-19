import AuthApp from "authApp/App";
import StateApp from "authApp/State";
// import { useRecoilValue } from "recoil";

const App = () => {
  // const value: any = useRecoilValue(StateApp);

  console.log("do hard things: ", StateApp);
  return (
    <div>
      <AuthApp />
      <div>Reading</div>
    </div>
  );
};

export default App;
