import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LIST_POSTS_QUERY } from '../pages/Posts';
import { CREATE_POST_MUTATION, CREATE_DRAFT_MUTATION, UPDATE_POST_MUTATION } from '../Mutation';

function PostForm({ initialData, onSubmit, isEditMode }) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ title: '', body: '', slug: '' });
  const [error, setError] = useState('');

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
    if (!formState.title || !formState.body || !formState.slug) {
      setError('All fields are required.');
      return;
    }
    if (/\s/.test(formState.slug)) {
      setError('Slug should not contain spaces.');
      return;
    }
    setError('');
    if (isEditMode) {
      updatePost();
    } else {
      createPost();
    }
  };

  const handleSaveDraft = () => {
    if (!formState.title || !formState.body || !formState.slug) {
      setError('All fields are required.');
      return;
    }
    if (/\s/.test(formState.slug)) {
      setError('Slug should not contain spaces.');
      return;
    }
    setError('');
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

      {error && <p style={{ color: 'red' }}>{error}</p>}

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