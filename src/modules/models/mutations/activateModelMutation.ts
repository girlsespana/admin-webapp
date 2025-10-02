import {graphql} from "@gql";

const activateModelMutation = graphql(`
  mutation activateModel($modelId: String!, $rangeType: ModelRangeType!) {
      activateModel(input: {modelId: $modelId, rangeType: $rangeType}) {
          model {
              id
          }
      }
  }
`)

export default activateModelMutation