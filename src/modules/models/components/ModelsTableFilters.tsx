import TableFilters from "@/components/tables/TableFilters";
import ActiveSelectFilter from "@/modules/models/components/forms/ActiveSelectFilter";
import VerifiedFilter from "@/modules/models/components/forms/VerifiedFilter";
import SearchByIDFilter from "@/modules/models/components/forms/SearchByIDFilter";

const ModelsTableFilters = () => {
  return (
    <TableFilters>
      <TableFilters.Section>
        <TableFilters.Row cols={5}>
          <SearchByIDFilter/>
          <VerifiedFilter/>
          <ActiveSelectFilter/>
        </TableFilters.Row>
      </TableFilters.Section>
    </TableFilters>
  )
}

export default ModelsTableFilters