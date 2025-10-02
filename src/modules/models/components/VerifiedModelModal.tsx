import NiceModal, { NiceModalHocProps, useModal } from "@ebay/nice-modal-react";
import { Button, Modal } from "@components";
import { FC, useState } from "react";
import { ModelNode } from "@types";
import { useMutation } from "@apollo/client";
import {GraphQLError, GraphQLFormattedError} from "graphql"; // 👈 Import correcto
import verifyModelMutation from "@/modules/models/mutations/verifyModelMutation";
import ModelsQuery from "@/modules/models/queries/ModelsQuery";
import ModelQuery from "@/modules/models/queries/ModelQuery";

interface Props extends NiceModalHocProps {
  node: ModelNode;
}

const VerifiedModelModal: FC<Props> = NiceModal.create(({ node }) => {
  const [errors, setErrors] = useState<GraphQLFormattedError[] | null>(null)

  const modal = useModal();

  const [verifyModel, { loading }] = useMutation(verifyModelMutation, {
    onCompleted: () => {
      modal.remove();
    },
    onError: (e) => {
      console.error(e.graphQLErrors);
      setErrors([...e.graphQLErrors] as GraphQLError[]);
    },
    refetchQueries: [
      { query: ModelsQuery },
      { query: ModelQuery, variables: { id: node.id } },
    ],
  });

  const handleVerifyModelBtn = () => {
    verifyModel({
      variables: {
        modelId: node.id,
      },
    });
  };

  return (
    <Modal show={modal.visible} onClose={() => modal.remove()}>
      <div className="pt-8 pb-4 px-4 w-full flex flex-col gap-y-4">
        <div className="font-bold text-lg">{node.name} ({node.user.name})</div>
        <div className="text-sm">Esta modelo será verificada.</div>

        {/* Advertencia */}
        <div className="text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
          ⚠️ Una vez verificada, la modelo quedará marcada como <b>VERIFICADA</b> en el sistema.
          Asegúrate de haber revisado toda su información antes de confirmar esta acción.
        </div>

        {/* Botón o mensaje si ya está verificada */}
        <div className="flex justify-center">
          {!node.isVerified ? (
            <Button
              disabled={loading}
              className="text-lg"
              onClick={handleVerifyModelBtn}
            >
              {loading ? "...Verificando" : "Verificar"}
            </Button>
          ) : (
            <div className="text-green-600 font-semibold">
              ✅ La modelo ya está verificada
            </div>
          )}
        </div>

        {/* Errores de GraphQL */}
        {errors && (
          <div className="text-sm text-red-500 mt-2">
            {errors.some((err) => err.message.includes("already verified"))
              ? "Esta modelo ya está verificada."
              : errors.map((err) => err.message).join(", ")}
          </div>
        )}
      </div>
    </Modal>
  );
});

export default VerifiedModelModal;
