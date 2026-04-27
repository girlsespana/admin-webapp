import {useParams} from 'react-router'
import {useQuery} from '@apollo/client'
import {ModelImageNode, ModelNode, ModelSubscriptionNode, type ModelVideoNode} from '@/gql/graphql'
import ModelQuery from "@/modules/models/queries/ModelQuery";
import ModelInfo from "@/modules/models/components/ModelInfo";
import ModelVideos from "@/modules/models/components/ModelVideos";
import ModelImages from "@/modules/models/components/ModelImages";
import ModelActions from "@/modules/models/components/ModelActions";
import DatesField from "@/modules/models/components/DatesField";
import SubscriptionsModal from "@/modules/models/components/SubscriptionsModal";
import NiceModal from "@ebay/nice-modal-react";
import {FiList} from "react-icons/fi";

const ModelPage = () => {
  const {modelId} = useParams()

  const {loading, error, data} = useQuery(ModelQuery, {
    variables: {id: modelId as string},
  })

  const handleOpenSubscriptionsModal = () => {
    NiceModal.show(SubscriptionsModal, {
      subscriptions: data?.model?.subscriptions?.filter((s): s is ModelSubscriptionNode => s !== null) || []
    });
  };

  const activeSubscription = data?.model?.subscriptions?.find(s => s?.isActive === true);

  if (loading) return 'loading...'
  if (error) return 'error'

  return (
    <div className="p-8 container space-y-8">
      <ModelInfo model={data?.model as ModelNode} showStatuses/>
      <div>
        <hr className="mb-8 border-primary-900"/>
        <div className="pb-4 text-sm font-semibold flex items-center justify-between">
          <span>Fechas</span>
          <button
            onClick={handleOpenSubscriptionsModal}
            className="flex items-center gap-2 px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          >
            <FiList/>
            <span>Suscripciones</span>
          </button>
        </div>
        <div className="text-sm flex justify-evenly">
          <DatesField label="Fecha de Activacion" date={activeSubscription?.startDate ?? null}/>
          <DatesField label="Fecha de desactivacion" date={activeSubscription?.endDate ?? null}/>
          <DatesField label="Fecha de destacada" date={data?.model?.featuredDate}/>
          <DatesField label="Fecha de no destacada" date={data?.model?.featuredExpirationDate}/>
        </div>
      </div>
      <div>
        <hr className="mb-8 border-primary-900"/>
        <ModelActions model={data!.model as ModelNode}/>
      </div>
      <div>
        <hr className="mb-8 border-primary-900"/>
        <div className="pb-4 text-sm font-semibold">Imagen de verificación</div>
        {
          data?.model?.verificationImages
            ? <ModelImages images={[data?.model?.verificationImages] as ModelImageNode[]}/>
            : <div className="w-full text-center text-gray-400 border border-dashed p-4 rounded-xl">sin foto de
              verificación</div>
        }
      </div>
      <div>
        <hr className="mb-8 border-primary-900"/>
        <div className="pb-4 text-sm font-semibold">Imagenes de publicas</div>
        <ModelImages images={data?.model?.images as ModelImageNode[]}/>
      </div>
      <div>
        <hr className="mb-8 border-primary-900"/>
        <ModelVideos videos={data?.model?.videos as ModelVideoNode[]}/>
      </div>
    </div>
  )
}

export default ModelPage