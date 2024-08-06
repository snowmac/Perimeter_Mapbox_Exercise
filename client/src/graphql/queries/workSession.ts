import { gql } from "@apollo/client";

export const GET_WORK_SESSION_BY_ID = gql`
query($worksessionByIdId: String!) {
  worksessionById($id: $worksessionByIdId) {
    id
    polygon {
      id
      coordinates
      name
    }
  }
}
`;
