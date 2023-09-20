import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const myState = atomWithStorage("view", "");
const useStateData = () => useAtom(myState);

export default useStateData;
