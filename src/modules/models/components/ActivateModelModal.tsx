import NiceModal, {NiceModalHocProps, useModal} from "@ebay/nice-modal-react";
import {Button, Modal} from "@components";
import {ModelNode, ModelRangeType} from "@types";
import {FC, useState} from "react";
import RangeModelSelect from "@/modules/models/components/forms/RangeModelSelect";
import {SingleValue} from "react-select";
import {SelectOption} from "@/components/forms/Select/types";
import {GraphQLError, GraphQLFormattedError} from "graphql/index";
import {useMutation} from "@apollo/client";
import activateModelMutation from "@/modules/models/mutations/activateModelMutation";
import modelQuery from "@/modules/models/queries/ModelQuery";
import modelsQuery from "@/modules/models/queries/ModelsQuery";

interface Props extends NiceModalHocProps {
  node: ModelNode;
}

const ActivateModelModal: FC<Props> = NiceModal.create(({node}) => {
    const [errors, setErrors] = useState<GraphQLFormattedError[] | null>(null)
    const [selectError, setSelectError] = useState<string | null>(null)
    const [rangeType, setRangeType] = useState<ModelRangeType | null>(null)

    const modal = useModal()
    const [activateModal, {loading}] = useMutation(activateModelMutation, {
      onCompleted: () => {
        modal.remove()
      },
      onError: (e) => {
        console.error(e.graphQLErrors);
        setErrors([...e.graphQLErrors] as GraphQLError[]);
      },
      refetchQueries: [modelQuery, modelsQuery]
    })

    const handleRangeSelectChange = (value: SingleValue<SelectOption>) => {
      if (value) {
        setSelectError(null)
        setRangeType(value.value as ModelRangeType)
      } else {
        setRangeType(null)
      }
    }

    const handleActivateModelBtn = () => {
      if (rangeType) {
        activateModal({
          variables: {
            modelId: node.id,
            rangeType: rangeType
          }
        })
      } else {
        setSelectError("Debes seleccionar un rango para activar la modelo")
      }
    }

    return (
      <Modal show={modal.visible} onClose={() => modal.remove()}>
        <div className="pt-8 pb-4 px-4 w-full flex flex-col gap-y-4">
          <div className="font-bold text-lg">{node.name} ({node.user.name})</div>
          <div className="text-sm">Esta modelo será activada.</div>
          <div className="text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
            ⚠️ Una vez activada, la modelo quedará marcada como <b>ACTIVA</b> en el sistema.
            Debes seleccionar la categoria en la cual quedara activada por los 30 siguientes dias
          </div>
          <div>
            <RangeModelSelect onChange={handleRangeSelectChange}/>
          </div>
          <div className="flex justify-center">
            <Button
              disabled={loading}
              className="text-lg"
              onClick={handleActivateModelBtn}
            >
              {loading ? "...Activando" : "Activar"}
            </Button>
          </div>
          {
            selectError &&
            <div className="text-sm text-red-500 text-center">
              {selectError}
            </div>
          }
          {
            errors && (
              <div className="text-sm text-red-500 mt-2">
                {errors.some((err) => err.message.includes("already activate"))
                  ? "Esta modelo ya está activada."
                  : errors.map((err) => err.message).join(", ")}
              </div>
            )
          }
        </div>
      </Modal>
    )
  }
)

export default ActivateModelModal