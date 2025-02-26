import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const LIST_DRAFTS_QUERY = gql`
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
          <li key={draft.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{draft.title}</h3>
            <p className="mt-2">{draft.body}</p>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleEditDraft(draft.id, draft.slug)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Edit</button>
              <button onClick={() => handleViewProfile(draft.user.id)} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">View Profile</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drafts;