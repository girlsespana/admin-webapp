import {useMemo} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {BannerNodeEdge} from "@types";
import {Button} from "@components";
import QueryTable from "@/components/tables/QueryTable";
import bannersQuery from "@/modules/banners/queries/bannersQuery";
import NiceModal from "@ebay/nice-modal-react";
import EditBannerModal from "@/modules/banners/components/EditBannerModal";

const BannersTable = () => {
  const colums = useMemo<ColumnDef<BannerNodeEdge>[]>(
    () => [
      {
        id: "title",
        header: "Titulo",
        enableSorting: false,
        accessorKey: "node.title"
      },
      {
        id:"category",
        header: "Categoria",
        enableSorting: false,
        accessorKey: "node.category"
      },
      {
        id: "city",
        header: "Ciudad",
        enableSorting: false,
        accessorKey: "node.city.name"
      },
      {
        id: "actions",
        header: "",
        size: 50,
        cell: info => (
          <div className="flex justify-center ">
            <Button
              className="text-xs"
              onClick={() => {NiceModal.show(EditBannerModal, {node: info.row.original.node!})}}
            >
              Editar
            </Button>
          </div>
        )
      }
    ],[])

  return (
    <QueryTable
      accessor="banners"
      query={bannersQuery}
      columns={colums}
    />
  )
}

export default BannersTable