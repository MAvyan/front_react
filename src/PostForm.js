import { gql, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LIST_POSTS_QUERY } from './Posts';

const CREATE_POST_MUTATION = gql`
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

const CREATE_DRAFT_MUTATION = gql`
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

// New mutation
const UPDATE_POST_MUTATION = gql`
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

function PostForm({ initialData, onSubmit, isEditMode }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ title: '', body: '', slug: '' });

  useEffect(() => {
    if (initialData) {
      setFormState({
        title: initialData.title || '',
        body: initialData.body || '',
        slug: initialData.slug || '',
      });
    }
  }, [initialData]);

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      title: formState.title,
      body: formState.body,
      slug: formState.slug,
    },
    update: (cache, { data: { createPost } }) => {
      const query = cache.readQuery({ query: LIST_POSTS_QUERY });
      query && cache.writeQuery({
        query: LIST_POSTS_QUERY,
        data: {
          listPublications: [createPost, ...query.listPublications],
        },
      });
    },
    onCompleted: () => navigate('/'),
  });

  const [createDraft] = useMutation(CREATE_DRAFT_MUTATION, {
    variables: {
      title: formState.title,
      body: formState.body,
      slug: formState.slug,
    },
    update: (cache, { data: { createPost } }) => {
      const query = cache.readQuery({ query: LIST_POSTS_QUERY });
      query && cache.writeQuery({
        query: LIST_POSTS_QUERY,
        data: {
          listPublications: [createPost, ...query.listPublications],
        },
      });
    },
    onCompleted: () => navigate('/drafts'),
  });

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: {
      postId: initialData.id,
      title: formState.title,
      body: formState.body,
      slug: formState.slug,
      status: 'published',
    },
    onCompleted: () => navigate('/'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updatePost();
    } else {
      createPost();
    }
  };

  const handleSaveDraft = () => {
    if (isEditMode) {
      updatePost({ variables: { ...updatePost.variables, status: 'draft' } });
    } else {
      createDraft();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '900px',
        margin: 'auto',
        textAlign: 'center',
      }}
    >
      <h2>{isEditMode ? 'Edit Post' : 'Create a post'}</h2>

      <input
        type="text"
        placeholder="Write post title here ..."
        value={formState.title}
        onChange={(e) => {
          setFormState({ ...formState, title: e.target.value });
        }}
      />

      <input
        type="text"
        placeholder="Write post slug here ..."
        value={formState.slug}
        onChange={(e) => {
          setFormState({ ...formState, slug: e.target.value });
        }}
      />

      <textarea
        rows={25}
        placeholder="Write post body here ..."
        value={formState.body}
        onChange={(e) => {
          setFormState({ ...formState, body: e.target.value });
        }}
      ></textarea>

      <button type="submit">Submit</button>
      <button
        type="button"
        onClick={handleSaveDraft}
      >
        Save as Draft
      </button>
    </form>
  );
}

export default PostForm;