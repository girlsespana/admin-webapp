import {graphql} from "@gql";

const CreateBannerMutation = graphql(`
    mutation createBannerMutation($input: CreateBannerInput!) {
        createBanner(input: $input){
            banner {
                id
            }
        }
    }
`)

export default CreateBannerMutation