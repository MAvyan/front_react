import React, { useState } from 'react';

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e, isDraft = false) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      slug,
      userId: 1,
      createdAt: new Date().toISOString(),
    };

    const storageKey = isDraft ? 'drafts' : 'posts';
    const existingPosts = JSON.parse(localStorage.getItem(storageKey)) || [];
    existingPosts.push(postData);
    localStorage.setItem(storageKey, JSON.stringify(existingPosts));

    onSubmit(postData, isDraft);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Save</button>
      <button type="button" onClick={(e) => handleSubmit(e, true)}>Save as Draft</button>
    </form>
  );
}

export default PostForm;