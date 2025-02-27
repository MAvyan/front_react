import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_PUBLICATIONS_QUERY } from '../Query';
import profileIcon from '../assets/profile.svg'; // Import the profile SVG icon
import readIcon from '../assets/read.svg'; // Import the read SVG icon

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchPublications, { data, loading, error }] = useLazyQuery(SEARCH_PUBLICATIONS_QUERY);

  useEffect(() => {
    if (location.state?.searchTerm) {
      searchPublications({ variables: { term: location.state.searchTerm } });
    }
  }, [location.state, searchPublications]);

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {data?.searchPublications.length > 0 ? (
        <ul className="space-y-4">
          {data.searchPublications.map((post) => (
            <li key={post.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md relative">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="mt-2">{truncateText(post.body, 10)}</p>
              <div className="mt-4 flex space-x-2">
                <div onClick={() => navigate(`/post/${post.slug}`)} className="cursor-pointer flex items-center space-x-2">
                  <img src={readIcon} alt="View Details" className="w-5 h-5" style={{ filter: 'invert(100%)' }} />
                </div>
                <div onClick={() => handleViewProfile(post.user.id)} className="cursor-pointer flex items-center space-x-2">
                  <img src={profileIcon} alt="View Profile" className="w-5 h-5" style={{ filter: 'invert(100%)' }} />
                </div>
              </div>
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