import NiceModal, {NiceModalHocProps, useModal} from "@ebay/nice-modal-react";
import {Button, Modal} from "@components";
import {ModelNode} from "@types";
import {FC, useState} from "react";
import {GraphQLError, GraphQLFormattedError} from "graphql/index";
import {useMutation} from "@apollo/client";
import deactivateModelMutation from "@/modules/models/mutations/deactivateModelMutation";
import modelQuery from "@/modules/models/queries/ModelQuery";
import modelsQuery from "@/modules/models/queries/ModelsQuery";

interface Props extends NiceModalHocProps {
  node: ModelNode;
}

const DeactivateModelModal: FC<Props> = NiceModal.create(({node}) => {
  const [errors, setErrors] = useState<GraphQLFormattedError[] | null>(null)

  const modal = useModal()

  const [deactivateModel, {loading}] = useMutation(deactivateModelMutation,{
    onCompleted: () => {
      modal.remove()
    },
    onError: (e) => {
      console.error(e.graphQLErrors);
      setErrors([...e.graphQLErrors] as GraphQLError[]);
    },
    refetchQueries: [modelQuery, modelsQuery]
  })

  const handleDeactivateModelBtn = () => {
    deactivateModel({
      variables:{
        modelId: node.id
      }
    })
  }


  return (
    <Modal
      show={modal.visible}
      onClose={() => modal.remove()}>
      <div className="pt-8 pb-4 px-4 w-full flex flex-col gap-y-4">
        <div className="font-bold text-lg">{node.name} ({node.user.name})</div>
        <div className="text-sm">Esta modelo será desactivada.</div>
        <div className="text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
          ⚠️ Una vez desactivada, la modelo quedará marcada como <b>DESACTIVADA</b> Y <b>NO VERIFICADA</b> en el sistema.
          y perdera la fecha de activacion actual
        </div>

        <div className="flex justify-center">
          <Button
            disabled={loading}
            className="text-lg"
            onClick={handleDeactivateModelBtn}
          >
            {loading ? "...Desactivando" : "Desactivar"}
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

export default DeactivateModelModal