import gql from 'graphql-tag';

export default gql`
  type WorkSession {
    id: String
    polygon: [Polygon!]!
  }

  type Query {
    worksessionById(id: String!): WorkSession
  }

  type Mutation {
    createSession: WorkSession
  }
`;