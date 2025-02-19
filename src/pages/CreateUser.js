import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../Mutation';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';

function CreateUser() {
  const [fullname, setFullname] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      navigate('/users');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ variables: { fullname, isAdmin, password } });
  };

  return (
    <div>
      <h2>Create User</h2>
      <UserForm
        fullname={fullname}
        setFullname={setFullname}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        isUpdate={false}
      />
    </div>
  );
}

export default CreateUser;