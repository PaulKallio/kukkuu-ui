import gql from 'graphql-tag';

const profileChildrenQuery = gql`
  query profileChildrenQuery {
    myProfile {
      id
      children {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
export default profileChildrenQuery;
