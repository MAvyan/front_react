import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query GetUserQuery($id: ID!) {
    getUser(id: $id) {
      fullname
      id
      isAdmin
      password
      posts {
        id
        title
        slug
      }
    }
  }
`;