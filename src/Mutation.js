import { gql } from '@apollo/client';

export const LOG_OUT_MUTATION = gql`
  mutation LogOutMutation {
    logOut {
      id
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $slug: String!, $body: String!) {
    createPost(title: $title, body: $body, slug: $slug, status: "published") {
      id
      slug
      publishedAt
      title
      body
      user {
        id
        fullname
      }
    }
  }
`;

export const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $slug: String!, $body: String!) {
    createPost(title: $title, body: $body, slug: $slug, status: "draft") {
      id
      slug
      publishedAt
      title
      body
      user {
        id
        fullname
      }
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($postId: ID!, $title: String!, $slug: String!, $body: String!, $status: String!) {
    updatePost(postId: $postId, title: $title, slug: $slug, body: $body, status: $status) {
      id
      slug
      title
      body
      status
    }
  }
`;

export const LOG_IN_MUTATION = gql`
  mutation LogInMutation($fullname: String!, $password: String!) {
    logIn(fullname: $fullname, password: $password) {
      id
    }
  }
`;