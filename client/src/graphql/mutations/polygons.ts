import { gql } from "@apollo/client";

export const deletePolygon = gql`
  query deletePolygon($id: String!) {
    deletePolygon(id: $id) {
      id
    }
  }
`;
