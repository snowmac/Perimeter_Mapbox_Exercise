import gql from 'graphql-tag';

export default gql`
  type DeletedPolygon {
    status: String!
  }

  type Polygon {
    id: Int!
    name: String!
    coordinates: String!
    properties: String!
    mapbox_id: String!
    work_session_id: String!
    work_session: WorkSession!
    updated_at: String!
    created_at: String!
  }

  type Query {
    polygon(id: Int!): Polygon
    polygons(sessionId: String!): [Polygon!]!
  }

  type Mutation {
    createPolygon(
      name: String!
      coordinates: String!
      properties: String!
      mapboxId: String!
      workSessionId: String!
    ): Polygon!

    updatePolygon(
      id: Int!
      name: String
      coordinates: String
      properties: String
      mapboxId: String
      workSessionId: String
    ): Polygon!

    deletePolygon(id: Int!): DeletedPolygon!
  }
`;