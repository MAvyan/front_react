import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div>
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <Link to={`/post/${post.slug}`}>Read more</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default SearchResults;