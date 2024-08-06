import { gql } from "@apollo/client";

export const GET_ALL_SESSIONS = gql`
query Polygons($sessionId: String!) {
  polygons(sessionId: $sessionId) {
    id
    name
    coordinates
    properties
    mapbox_id
    work_session_id
    updated_at
    created_at
  }
}
`;
