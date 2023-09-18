import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./router/mainRouter";
import { RecoilRoot } from "recoil";
const App = () => {
  return (
    <div>
      <RecoilRoot>
        <RouterProvider router={mainRouter} />
      </RecoilRoot>
    </div>
  );
};

export default App;
