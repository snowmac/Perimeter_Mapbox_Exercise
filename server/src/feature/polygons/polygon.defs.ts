const { gql } = require('apollo-server');

export const polygonTypeDefs = gql`
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
    polygons: [Polygon!]!
  }

  type Mutation {
    createPolygon(
      name: String!
      coordinates: String!
      properties: String!
      mapbox_id: String!
      work_session_id: String!
    ): Polygon!

    updatePolygon(
      id: Int!
      name: String
      coordinates: String
      properties: String
      mapbox_id: String
      work_session_id: String
    ): Polygon!

    deletePolygon(id: Int!): Polygon!
  }
`;