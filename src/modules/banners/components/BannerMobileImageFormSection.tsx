import {useRecoilState} from "recoil";
import ImageUploadField from "@/components/forms/ImageUploadField";
import BannerMobileImageState from "@/modules/banners/atoms/BannerMobileImageState";

const BannerMobileImageFormSection = () => {
  const [bannerMobileImage, setBannerMobileImage] = useRecoilState(BannerMobileImageState)

  return (
    <ImageUploadField
      label="Imagen para celular"
      value={bannerMobileImage}
      onChange={setBannerMobileImage}
    />
  )
}

export default BannerMobileImageFormSection