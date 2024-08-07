import { gql } from "@apollo/client";

export const DELETE_POLYGON = gql`
  query deletePolygon($id: String!) {
    deletePolygon(id: $id) {
      id
    }
  }
`;

export const CREATE_POLYGON = gql`
  mutation createPolygon($input: PolygonInput!) {
    createPolygon(input: $input) {
      id
      name
      coordinates
    }
  }
`;