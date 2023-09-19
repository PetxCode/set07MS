import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userStateDetail = atom({
  key: "userStateDetail",
  default: "" || null || undefined,
  effects_UNSTABLE: [persistAtom],
});
