import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_QUERY } from '../Query';
import { UPDATE_USER_MUTATION, DELETE_USER_MUTATION } from '../Mutation';
import UserForm from '../components/UserForm';
import DeleteButton from '../buttons/DeleteButton';

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  const { data, loading: queryLoading, error: queryError } = useQuery(GET_USER_QUERY, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      setFullname(data.getUser.fullname);
      setIsAdmin(data.getUser.isAdmin);
      setPassword(data.getUser.password);
    }
  }, [data]);

  const [updateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      navigate('/users');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ variables: { userId: id, fullname, isAdmin, password } });
  };

  if (queryLoading) return <div>Loading...</div>;
  if (queryError) return <div>Error: {queryError.message}</div>;

  return (
    <div>
      <h2>Update User</h2>
      <UserForm
        fullname={fullname}
        setFullname={setFullname}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={mutationLoading}
        error={mutationError}
        isUpdate={true}
      />
      <DeleteButton
        mutation={DELETE_USER_MUTATION}
        variables={{ userId: id }}
        onCompleted={() => navigate('/users')}
      />
    </div>
  );
}

export default UpdateUser;