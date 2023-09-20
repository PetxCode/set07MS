import { useEffect, useState } from "react";
import { viewPeoductAPI } from "../../API/authAPI";

const HomePage = () => {
  const [stateUser] = useState(JSON.parse(localStorage.getItem("view")!));

  const [state, setState] = useState([]);

  useEffect(() => {
    viewPeoductAPI(stateUser!).then((res) => {
      setState(res);
    });
  }, []);

  return (
    <div className="flex flex-wrap">
      {state?.map((props: any) => (
        <div>
          <div className="w-[170px] border rounded p-2 min-h-[200px] m-2 ">
            <div className="bg-red-50 border rounded w-full h-[150px] mb-2" />
            <div>
              <div>{props.title}</div>
              <div>{props.description}</div>
              <div>{props.price}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
