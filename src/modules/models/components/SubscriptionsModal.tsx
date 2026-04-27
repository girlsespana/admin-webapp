import NiceModal, { NiceModalHocProps, useModal } from "@ebay/nice-modal-react";
import { Modal } from "@components";
import { type ModelSubscriptionNode } from "@/gql/graphql";
import { FC } from "react";

interface Props extends NiceModalHocProps {
  subscriptions: ModelSubscriptionNode[];
}

const SubscriptionsModal: FC<Props> = NiceModal.create(({ subscriptions }) => {
  const modal = useModal();

  const formatDate = (date?: string | null) => {
    if (!date) return '-';
    return date.split('T')[0];
  };

  return (
    <Modal show={modal.visible} onClose={() => modal.remove()} size="2xl">
      <Modal.Header>
        <div className="font-bold text-lg">Historial de Suscripciones</div>
      </Modal.Header>
      <Modal.Body>
        {subscriptions.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No hay suscripciones registradas
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2">Tipo</th>
                  <th className="text-left py-2 px-2">Inicio</th>
                  <th className="text-left py-2 px-2">Fin</th>
                  <th className="text-left py-2 px-2">Días</th>
                  <th className="text-left py-2 px-2">Estado</th>
                  <th className="text-left py-2 px-2">Creada</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-2">{subscription.rangeType}</td>
                    <td className="py-2 px-2">{formatDate(subscription.startDate)}</td>
                    <td className="py-2 px-2">{formatDate(subscription.endDate)}</td>
                    <td className="py-2 px-2">{subscription.daysPurchased}</td>
                    <td className="py-2 px-2">
                      {subscription.isActive ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          Activa
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          Inactiva
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-2">{formatDate(subscription.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
});

export default SubscriptionsModal;
