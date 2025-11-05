import NiceModal, {NiceModalHocProps, useModal} from "@ebay/nice-modal-react";
import {Button, Modal} from "@components";
import {ModelNode} from "@types";
import {FC, useState} from "react";
import {GraphQLError, GraphQLFormattedError} from "graphql/index";
import {useMutation} from "@apollo/client";
import modelQuery from "@/modules/models/queries/ModelQuery";
import modelsQuery from "@/modules/models/queries/ModelsQuery";
import featuredModelMutation from "@/modules/models/mutations/featuredModelMutation";

interface Props extends NiceModalHocProps {
  node: ModelNode;
}

const FeaturedModelModal: FC<Props> = NiceModal.create(({node}) => {
    const [errors, setErrors] = useState<GraphQLFormattedError[] | null>(null)

    const modal = useModal()

    const [featuredModal, {loading}] = useMutation(featuredModelMutation, {
      onCompleted: () => {
        modal.remove()
      },
      onError: (e) => {
        console.error(e.graphQLErrors);
        setErrors([...e.graphQLErrors] as GraphQLError[]);
      },
      refetchQueries: [modelQuery, modelsQuery]
    })

    const handleFeaturedModelBtn = async () => {
      console.log(node);
      await featuredModal(
        {
          variables: {
            input: {
              modelId: node.id
            }
          }
        }
      )
    }

    return (
      <Modal show={modal.visible} onClose={() => modal.remove()}>
        <div className="pt-8 pb-4 px-4 w-full flex flex-col gap-y-4">
          <div className="font-bold text-lg">{node.name} ({node.user.name})</div>
          <div className="text-sm">Esta modelo será destacada.</div>
          <div className="text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
            ⚠️ Una vez destacada, la modelo quedará marcada como <b>DESTACADA</b> en el sistema.
            y quedara destacada para aparecer en la secciones de novedades durante una semana
          </div>
          <div className="flex justify-center">
            <Button
              disabled={loading}
              className="text-lg"
              onClick={handleFeaturedModelBtn}
            >
              {loading ? "...Destacando" : "Destacar"}
            </Button>
          </div>
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

export default FeaturedModelModal