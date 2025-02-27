import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import editPenIcon from '../assets/edit-pen.svg'; // Import the edit-pen SVG icon
import profileIcon from '../assets/profile.svg'; // Import the profile SVG icon

export const LIST_DRAFTS_QUERY = gql`
  query ListDraftsQuery {
    listDrafts {
      id
      title
      body
      slug
      user {
        id
        fullname
      }
    }
  }
`;

function Drafts() {
  const { data } = useQuery(LIST_DRAFTS_QUERY);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const draftsPerPage = 4; // Change the number of drafts per page to 4

  const handleEditDraft = (id, slug) => {
    navigate(`/edit-draft/${id}/${slug}`);
  };

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  const totalPages = data ? Math.ceil(data.listDrafts.length / draftsPerPage) : 0;
  const currentDrafts = data ? data.listDrafts.slice((currentPage - 1) * draftsPerPage, currentPage * draftsPerPage) : [];

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-10 text-center">All Drafts</h2>
      <div className="min-h-[calc(100vh-300px)] flex flex-col justify-between"> {/* Adjust the min-height as needed */}
        <ul className="space-y-4">
          {currentDrafts.map((draft) => (
            <li key={draft.id} className="bg-gray-800 text-white p-4 rounded-2xl shadow-2xl relative">
              <div className="absolute top-2 right-2 flex space-x-2 mt-2 mr-2">
                <img
                  src={editPenIcon}
                  alt="Edit Draft"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleEditDraft(draft.id, draft.slug)}
                  style={{ filter: 'invert(100%)' }} // Apply filter to make the icon white
                />
                <img
                  src={profileIcon}
                  alt="View Profile"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleViewProfile(draft.user.id)}
                  style={{ filter: 'invert(100%)' }} // Apply filter to make the icon white
                />
              </div>
              <h3 className="text-xl font-semibold">{draft.title}</h3>
              <div className="text-gray-400 mt-2">
                <span>By {draft.user.fullname}</span>
              </div>
              <p className="mt-2">{truncateText(draft.body, 10)}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Drafts;