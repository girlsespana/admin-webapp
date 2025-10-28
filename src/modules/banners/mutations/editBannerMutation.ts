import {graphql} from "@gql";

const editBannerMutation = graphql(`
  mutation editBanner($input: EditBannerInput!){
      editBanner(input: $input){
          banner {
              id
          }
      }
  }
`)

export default editBannerMutation