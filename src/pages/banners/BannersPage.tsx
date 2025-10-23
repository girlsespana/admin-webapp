import PageTable from "@/components/tables/PageTable";
import BannersTable from "@/modules/banners/components/BannersTable";
import {Button} from "@components";
import NiceModal from "@ebay/nice-modal-react";
import CreateBannerModal from "@/modules/banners/components/CreateBannerModal";

const BannersPage = () => {
  return (
    <PageTable>
      <PageTable.Header title="Banners">
        <Button onClick={() => NiceModal.show(CreateBannerModal)}>
          Crear Banner
        </Button>
      </PageTable.Header>
      <PageTable.Table>
        <BannersTable/>
      </PageTable.Table>
    </PageTable>
  )
}

export default BannersPage