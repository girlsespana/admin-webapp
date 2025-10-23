import {useRecoilState} from "recoil";
import BannerDesktopImageState from "@/modules/banners/atoms/BannerDesktopImageState";
import ImageUploadField from "@/components/forms/ImageUploadField";

const BannerDesktopImageFormSection = () => {
  const [bannerImageDesktop, setBannerImageDesktop] = useRecoilState(BannerDesktopImageState)

  return (
    <div>
      <ImageUploadField value={bannerImageDesktop} onChange={setBannerImageDesktop} label="Imagen para computador"/>
    </div>
  )
}

export default BannerDesktopImageFormSection