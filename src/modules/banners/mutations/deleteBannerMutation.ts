import {graphql} from "@gql";

const deleteBannerMutation = graphql(`
  mutation deleteBannerMutation($input: DeleteBannerInput!) {
      deleteBanner(input: $input) {
          success
      }
  }
`)

export default deleteBannerMutation