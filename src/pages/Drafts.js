import React from 'react';
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

  const handleEditDraft = (id, slug) => {
    navigate(`/edit-draft/${id}/${slug}`);
  };

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Drafts</h2>
      <ul className="space-y-4">
        {data && data.listDrafts.map((draft) => (
          <li key={draft.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md relative">
            <div className="absolute top-2 right-2 flex space-x-2">
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
            <p className="mt-2">{draft.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drafts;