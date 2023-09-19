import { useRecoilValue } from "recoil";
import { userIn, userDetail } from "../../global/recoil";
import { useEffect, useState } from "react";
import { viewPeoductAPI } from "../../API/authAPI";

const HomePage = () => {
  const value = useRecoilValue(userIn);
  const valueDetial = useRecoilValue(userDetail);
  console.log(value);
  console.log(valueDetial);

  const [state, setState] = useState([]);

  useEffect(() => {
    viewPeoductAPI(value).then((res) => {
      setState(res);
    });
  }, []);

  console.log(state);

  return (
    <div className="flex flex-wrap">
      {state?.map((props: any) => (
        <div>
          <div className="w-[170px] border rounded p-2 min-h-[200px] m-2 ">
            <div className="bg-red-50 border rounded w-full h-[150px] mb-2" />
            <div>
              <div>title</div>
              <div>desc</div>
              <div>price</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
