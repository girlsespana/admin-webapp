import { graphql } from '@gql'

const ModelQuery = graphql(`
    query Model($id:ID!) {
        model(id:$id){
            id
            gender
            name
            height
            metrics
            weight
            age
            hairColor
            eyesColor
            nationality
            boobs
            smoker
            piercings
            tattoos
            party
            gender
            languages
            rangeType
            description
            isActive
            isVerified
            services
            nonVisibleServices
            attributes
            city{
                id
                name
            }
            images {
                id
                imageUrl
            }
            verificationImages {
                imageUrl
                id
            }
            videos {
                id
                videoUrl
            }
            user {
                name
                phoneNumbers {
                    edges {
                        node {
                            id
                            phone
                            type
                        }
                    }
                }
            }
        }
    }
`)

export default ModelQuery