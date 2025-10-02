import {useParams} from 'react-router'
import {useQuery} from '@apollo/client'
import {ModelImageNode, ModelNode, type ModelVideoNode} from '@/gql/graphql'
import ModelQuery from "@/modules/models/queries/ModelQuery";
import ModelInfo from "@/modules/models/components/ModelInfo";
import ModelVideos from "@/modules/models/components/ModelVideos";
import ModelImages from "@/modules/models/components/ModelImages";
import ModelActions from "@/modules/models/components/ModelActions";

const ModelPage = () => {
  const {modelId} = useParams()

  const {loading, error, data} = useQuery(ModelQuery, {
    variables: {id: modelId as string},
  })

  if (loading) return 'loading...'
  if (error) return 'error'

  return (
    <div className="p-8 container space-y-8">
      <ModelInfo model={data?.model as ModelNode} showStatuses/>
      <div>
        <hr className="mb-8 border-primary-900"/>
        <ModelActions model={data!.model as ModelNode} />
      </div>
      <div>
        <hr className="mb-8 border-primary-900"/>
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