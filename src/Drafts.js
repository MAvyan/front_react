import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    setDrafts(storedDrafts);
  }, []);

  const handleEditDraft = (id) => {
    navigate(`/edit-draft/${id}`);
  };

  return (
    <div>
      <h2>All Drafts</h2>
      <ul>
        {drafts.map((draft) => (
          <li key={draft.id}>
            <h3>{draft.title}</h3>
            <p>{draft.content}</p>
            <button onClick={() => handleEditDraft(draft.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drafts;