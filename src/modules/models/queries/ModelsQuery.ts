import {graphql} from "@gql";

const ModelsQuery = graphql(`
    query Models($first: Int, $after: String, $isActive: Boolean, $isVerified: Boolean, $id: String, $cityId: ID,) {
        models(first: $first, after: $after, isActive: $isActive, isVerified: $isVerified, id: $id, city: $cityId) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
            }
            edges {
                cursor
                node {
                    id
                    name
                    description
                    rangeType
                    isActive
                    isVerified
                    activationDate
                    createdAt
                    updatedAt
                    user {
                        id
                        name
                        email
                    }
                    city{
                        id
                        name
                    }
                    images {
                        id
                        imageUrl
                    }
                    
                }
            }
        }
    }

`)

export default ModelsQuery