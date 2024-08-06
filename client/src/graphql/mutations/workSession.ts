import { gql } from "@apollo/client";

export const CREATE_WORK_SESSION = gql`
  mutation CreateSession {
    createSession {
      id
    }
  }
`;
