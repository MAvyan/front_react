import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const LIST_DRAFTS_QUERY = gql`
  query ListDraftsQuery {
    listDrafts {
      id
      title
      body
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

  const handleEditDraft = (id) => {
    navigate(`/edit-draft/${id}`);
  };

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div>
      <h2>All Drafts</h2>
      <ul>
        {data && data.listDrafts.map((draft) => (
          <li key={draft.id}>
            <h3>{draft.title}</h3>
            <p>{draft.body}</p>
            <button onClick={() => handleEditDraft(draft.id)}>Edit</button>
            <button onClick={() => handleViewProfile(draft.user.id)}>View Profile</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drafts;