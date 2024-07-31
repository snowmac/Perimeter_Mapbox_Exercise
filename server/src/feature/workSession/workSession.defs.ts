const { gql } = require('apollo-server');

export default gql`
  type WorkSession {
    id: String
    ploygons: [Ploygon!]!
  }

  type Query {
    worksessionById(id: String!): WorkSession
  }

  type Mutation {
    createSession(): WorkSession
  }
`;