import { gql } from "@apollo/client";

export const DELETE_POLYGON = gql`
  mutation DeletePolygon($id: Int!) {
    deletePolygon(id: $id) {
      status
    }
  }
`;

export const UPDATE_POLYGON = gql`
  mutation UpdatePolygon(
    $id: Int!
    $name: String!
    $coordinates: String!
    $properties: String!
    $mapboxId: String!
    $workSessionId: String!
  ) {
    updatePolygon(
      id: $id
      name: $name
      coordinates: $coordinates
      properties: $properties
      mapboxId: $mapboxId
      workSessionId: $workSessionId
    ) {
      id
    }
  }
`;

export const CREATE_POLYGON = gql`
  mutation CreatePolygon(
    $name: String!
    $coordinates: String!
    $properties: String!
    $mapboxId: String!
    $workSessionId: String!
  ) {
    createPolygon(
      name: $name
      coordinates: $coordinates
      properties: $properties
      mapboxId: $mapboxId
      workSessionId: $workSessionId
    ) {
      id
    }
  }
`;
