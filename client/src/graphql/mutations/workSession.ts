import { gql } from "@apollo/client";

export const INIT_WORK_SESSION = gql`
  mutation CreateSession {
    createSession {
      id
    }
  }
`;
