import NiceModal, {NiceModalHocProps, useModal} from "@ebay/nice-modal-react";
import {Modal} from "@components";
import {FC} from "react";
import CreateBannerForm from "@/modules/banners/components/CreateBannerForm";

const CreateBannerModal: FC<NiceModalHocProps> = NiceModal.create(() => {
    const modal = useModal()

    return (
      <Modal
        size="xl"
        show={modal.visible}
        onClose={() => modal.remove()}>
        <div className="pt-8 pb-4 px-4 w-full flex flex-col gap-y-4">
          <div className="font-bold text-lg">Crear Banner</div>
          <CreateBannerForm/>
        </div>
      </Modal>
    )
  }
)

export default CreateBannerModal;