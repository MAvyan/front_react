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

export const SEARCH_PUBLICATIONS_QUERY = gql`
  query SearchPublicationsQuery($term: String!) {
    searchPublications(term: $term) {
      id
      title
      slug
      body
      publishedAt
      user {
        id
        fullname
      }
    }
  }
`;