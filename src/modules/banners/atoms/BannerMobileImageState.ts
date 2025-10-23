import {atom} from "recoil";
import {ImageFile} from "@/modules/banners/types";

const BannerMobileImageState = atom<ImageFile | null>({
  key: "BannerMobileImageState",
  default: null
})

export default BannerMobileImageState;