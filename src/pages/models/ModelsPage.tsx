import ModelsTable from "@/modules/models/components/ModelsTable";
import PageTable from "@/components/tables/PageTable";
import ModelsTableFilters from "@/modules/models/components/ModelsTableFilters";

const ModelsPage = () => {
  return (
    <PageTable>
      <PageTable.Header title="Modelos">

      </PageTable.Header>

      <PageTable.Filters>
        <ModelsTableFilters/>
      </PageTable.Filters>

      <PageTable.Table>
        <ModelsTable/>
      </PageTable.Table>
    </PageTable>
  )
}

export default ModelsPage;