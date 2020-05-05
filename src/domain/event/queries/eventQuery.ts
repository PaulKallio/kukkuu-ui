import gql from 'graphql-tag';

const eventQuery = gql`
  query eventQuery($id: ID!, $date: Date, $time: Time) {
    event(id: $id) {
      id
      name
      description
      shortDescription
      image
      imageAltText
      participantsPerInvite
      duration
      capacityPerOccurrence
      occurrences(upcoming: true, date: $date, time: $time) {
        edges {
          node {
            id
            time
            remainingCapacity
            event {
              id
              name
            }
            venue {
              id
              name
              description
              address
            }
          }
        }
      }
    }
  }
`;
export default eventQuery;
