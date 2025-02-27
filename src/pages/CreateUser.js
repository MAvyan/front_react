import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../Mutation';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { LIST_USERS_QUERY } from '../pages/Users';

function CreateUser() {
  const [fullname, setFullname] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    variables: { fullname, isAdmin, password },
    update: (cache, { data: { createUser } }) => {
      const query = cache.readQuery({ query: LIST_USERS_QUERY });
      query && cache.writeQuery({
        query: LIST_USERS_QUERY,
        data: {
          listUsers: [createUser, ...query.listUsers],
        },
      });
    },
    onCompleted: () => {
      navigate('/users');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
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