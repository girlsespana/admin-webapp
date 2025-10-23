import {graphql} from "@gql";

const bannersQuery = graphql(`
  query bannersQuery {
      banners{
          pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
          }
          edges {
              node {
                  id
                  title
                  url
                  mobileUrl
                  action
                  category
                  city {
                      id
                      name
                  }
              }
          }
      }
  }
`)

export default bannersQuery