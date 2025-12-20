import NiceModal, {NiceModalHocProps, useModal} from "@ebay/nice-modal-react";
import {Button, Modal} from "@components";
import {FC, useState} from "react";
import {GraphQLError, GraphQLFormattedError} from "graphql/index";
import {useMutation} from "@apollo/client";
import deleteBannerMutation from "@/modules/banners/mutations/deleteBannerMutation";
import bannersQuery from "@/modules/banners/queries/bannersQuery";
import {BannerNode} from "@types";

interface Props extends NiceModalHocProps {
  node: BannerNode
}

const DeleteBannerModal: FC<Props> = NiceModal.create(({node}) => {
  const [errors, setErrors] = useState<GraphQLFormattedError[] | null>(null)

  const modal = useModal()

  const [deleteBanner, {loading}] = useMutation(deleteBannerMutation, {
    onCompleted: () => {
      modal.remove()
    },
    onError: (e) => {
      console.error(e.graphQLErrors);
      setErrors([...e.graphQLErrors] as GraphQLError[]);
    },
    refetchQueries: [bannersQuery]
  })

  const handleDeleteBannerBtn = async () => {
    await deleteBanner({
      variables: {
        input:{
          id: node.id
        }
      }
    })
  }

  return (
    <Modal
      size="md"
      show={modal.visible}
      onClose={() => modal.remove()}>
      <div className="pt-8 pb-4 px-4 w-full flex flex-col gap-y-4">
        <div className="font-bold text-lg">{node.title} </div>
        <div className="text-sm">Este banner sera eliminado.</div>
        <div className="border border-dashed rounded-lg p-2 w-full">
          <div className="relative group w-full h-full rounded-lg overflow-hidden">
            <img
              src={node.url}
              alt="Uploaded preview"
              className="mx-auto object-cover rounded-lg max-h-36"
            />
          </div>
        </div>
        <div className="text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
          ⚠️ Una vez eliminado, el banner no sera accesible y no podra <b>RECUPERARSE</b>
        </div>

        <div className="flex justify-center">
          <Button
            disabled={loading}
            className="text-lg"
            onClick={handleDeleteBannerBtn}
          >
            {loading ? "...Borrando" : "Borrar"}
          </Button>
        </div>

        {
          errors && (
            <div className="text-sm text-red-500 mt-2">
              {errors.map((err) => err.message).join(", ")}
            </div>
          )
        }
      </div>

    </Modal>
  )
})

export default DeleteBannerModal