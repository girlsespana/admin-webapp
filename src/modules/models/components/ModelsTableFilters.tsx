import TableFilters from "@/components/tables/TableFilters";
import ActiveSelectFilter from "@/modules/models/components/forms/ActiveSelectFilter";
import VerifiedFilter from "@/modules/models/components/forms/VerifiedFilter";

const ModelsTableFilters = () => {
  return (
    <TableFilters>
      <TableFilters.Section>
        <TableFilters.Row cols={5}>
          <VerifiedFilter/>
          <ActiveSelectFilter/>
        </TableFilters.Row>
      </TableFilters.Section>
    </TableFilters>
  )
}

export default ModelsTableFilters