import gql from 'graphql-tag';

export const childByIdQuery = gql`
  query childByIdQuery($id: ID!) {
    child(id: $id) {
      id
      firstName
      lastName
      birthdate
      postalCode
      project {
        id
        name
        year
      }
      occurrences(upcomingWithLeeway: true) {
        edges {
          node {
            id
            time
            venue {
              id
              name
              address
            }
            event {
              id
              name
              shortDescription
              duration
              image
              imageAltText
              participantsPerInvite
            }
          }
        }
      }
      availableEvents {
        edges {
          node {
            id
            name
            shortDescription
            image
            imageAltText
            participantsPerInvite
          }
        }
      }
      pastEvents {
        edges {
          node {
            id
            name
            shortDescription
            image
            imageAltText
            participantsPerInvite
            occurrences {
              edges {
                node {
                  id
                  time
                }
              }
            }
          }
        }
      }
      relationships {
        edges {
          node {
            id
            type
          }
        }
      }
    }
  }
`;
