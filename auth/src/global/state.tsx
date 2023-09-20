import { useRecoilValue } from "recoil";
import { userDetail } from "./recoil";

const useData = () => {
  const value = useRecoilValue(userDetail);
  return { value };
};

export default useData;
