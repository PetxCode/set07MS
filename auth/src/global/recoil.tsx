import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const user = atom({
  key: "user",
  default: "" || null || undefined,
  effects_UNSTABLE: [persistAtom],
});

export const userDetail = atom({
  key: "userDetail",
  default: "" || null || undefined,
  effects_UNSTABLE: [persistAtom],
});
