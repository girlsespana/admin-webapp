import {atom} from "recoil";
import {ImageFile} from "@/modules/banners/types";

const BannerDesktopImageState = atom<ImageFile | null>({
  key: "BannerDesktopImageState",
  default: null
})

export default BannerDesktopImageState;