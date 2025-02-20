import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

function DeleteButton({ mutation, variables, onCompleted }) {
  const navigate = useNavigate();
  const [deleteItem, { loading, error }] = useMutation(mutation, {
    variables,
    onCompleted: () => {
      console.log(`Item deleted successfully.`);
      if (onCompleted) {
        onCompleted();
      } else {
        navigate(-1); // Navigate back to the previous page
      }
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem();
    }
  };

  if (loading) return <button disabled>Deleting...</button>;
  if (error) return <button disabled>Error: {error.message}</button>;

  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteButton;