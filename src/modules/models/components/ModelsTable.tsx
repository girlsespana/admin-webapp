import QueryTable from "@/components/tables/QueryTable";
import {useMemo} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {ModelNodeEdge} from "@types";
import ModelsQuery from "@/modules/models/queries/ModelsQuery";
import {Button} from "@components";
import BooleanStatusIcon from "@/components/tables/BooleanStatusIcon";
import {useNavigate} from "react-router-dom";

const ModelsTable = () => {
  const navigate = useNavigate();
  const colums = useMemo<ColumnDef<ModelNodeEdge>[]>(
    () => [
      {
        id: "id",
        header: "id",
        enableSorting: false,
        accessorKey: "node.id"
      },
      {
        id: "name",
        header: "Nombre",
        enableSorting: false,
        accessorKey: "node.name"
      },
      {
        id: "isVerified",
        header: "Verificada",
        enableSorting: false,
        cell: info => (
          <BooleanStatusIcon status={info.row.original.node?.isVerified ?? false}/>
        )
      },
      {
        id: "isActive",
        header: "Activa",
        enableSorting: false,
        cell: info => (
          <BooleanStatusIcon status={info.row.original.node?.isActive ?? false}/>
        )
      },
      {
        id: "city",
        header: "Ciudad",
        enableSorting: false,
        accessorKey: "node.city.name"
      },
      {
        id: "agency",
        header: "Agencia",
        enableSorting: false,
        accessorKey: "node.user.name"
      },
      {
        id: "actions",
        header: "",
        size: 50,
        cell: info => (
          <div className="flex justify-center ">
            <Button
              className="text-xs "
              onClick={() => {
                const id = info.row.original.node?.id;
                if (id) navigate(`/models/${id}`);
              }}
            >
              Ver
            </Button>
          </div>
        )
      }
    ],[])

  return (
    <QueryTable
      accessor='models'
      fetchPolicy="network-only"
      query={ModelsQuery}
      infiniteScroll
      columns={colums}/>
  )
}

export default ModelsTable;