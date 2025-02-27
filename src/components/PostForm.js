import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LIST_POSTS_QUERY } from '../pages/Posts';
import { CREATE_POST_MUTATION, CREATE_DRAFT_MUTATION, UPDATE_POST_MUTATION } from '../Mutation';
import { LIST_DRAFTS_QUERY } from '../pages/Drafts';

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
      const query = cache.readQuery({ query: LIST_DRAFTS_QUERY });
      query && cache.writeQuery({
        query: LIST_DRAFTS_QUERY,
        data: {
          listDrafts: [createPost, ...query.listDrafts],
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
    <form onSubmit={handleSubmit} className="container mx-auto p-4 bg-gray-800 text-white rounded-2xl" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Post' : 'Create a post'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={formState.title}
          onChange={(e) => setFormState({ ...formState, title: e.target.value })}
          className="px-2 py-1 rounded bg-gray-700 text-white w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="slug" className="block mb-2">Slug:</label>
        <input
          type="text"
          id="slug"
          value={formState.slug}
          onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
          className="px-2 py-1 rounded bg-gray-700 text-white w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="body" className="block mb-2">Body:</label>
        <textarea
          id="body"
          rows={10}
          value={formState.body}
          onChange={(e) => setFormState({ ...formState, body: e.target.value })}
          className="px-2 py-1 rounded bg-gray-700 text-white w-full"
        ></textarea>
      </div>

      <div className="mt-4 flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
          {isEditMode ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={handleSaveDraft}
          className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 w-full"
        >
          Save as Draft
        </button>
      </div>
    </form>
  );
}

export default PostForm;