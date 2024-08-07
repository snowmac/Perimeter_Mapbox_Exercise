import { gql } from "@apollo/client";

export const DELETE_POLYGON = gql`
  query deletePolygon($id: String!) {
    deletePolygon(id: $id) {
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
      mapbox_id: $mapboxId
      work_session_id: $workSessionId
    ) {
      id
    }
  }
`;
