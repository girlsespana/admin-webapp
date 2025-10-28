import NiceModal, {NiceModalHocProps, useModal} from "@ebay/nice-modal-react";
import {FC} from "react";
import {BannerNode} from "@types";
import {Modal} from "@components";
import EditBannerForm from "@/modules/banners/components/EditBannerForm";
import {useSetRecoilState} from "recoil";
import BannerDesktopImageState from "@/modules/banners/atoms/BannerDesktopImageState";
import BannerMobileImageState from "@/modules/banners/atoms/BannerMobileImageState";

interface Props extends NiceModalHocProps {
  node: BannerNode
}

const EditBannerModal: FC<Props> = NiceModal.create(({node}) => {
  const modal = useModal()
  const setBannerDesktopImage = useSetRecoilState(BannerDesktopImageState)
  const setBannerMobileImage = useSetRecoilState(BannerMobileImageState)

  const handleCloseModal = () => {
    modal.remove()
    setBannerDesktopImage(null)
    setBannerMobileImage(null)
  }

  return(
    <Modal
      size="md"
      show={modal.visible}
      onClose={handleCloseModal}>
      <div className="pt-8 pb-4 px-4 w-full flex flex-col gap-y-4">
        <div className="font-bold text-lg">Editar Banner</div>
        <EditBannerForm node={node}/>
      </div>
    </Modal>
  )
})

export default EditBannerModal