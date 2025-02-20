import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { DELETE_POST_MUTATION } from '../Mutation';
import DeleteButton from '../buttons/DeleteButton';

export const LIST_POSTS_QUERY = gql`
  query ListPostsQuery {
    listPublications {
      id
      slug
      title
      body
      publishedAt
      user {
        id
        fullname
      }
    }
  }
`;

function Posts() {
  const { data } = useQuery(LIST_POSTS_QUERY);
  const navigate = useNavigate();

  const handleViewDetails = (slug) => {
    navigate(`/post/${slug}`);
  };

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleEditPost = (id, slug) => {
    navigate(`/edit-post/${id}/${slug}`);
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin;

  console.log(data);

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {data && data.listPublications.map((Post) => (
          <li key={Post.id}>
            <h3>{Post.title}</h3>
            <p>{Post.body}</p>
            <button onClick={() => handleViewDetails(Post.slug)}>View Details</button>
            <button onClick={() => handleViewProfile(Post.user.id)}>View Profile</button>
            {isAdmin && (
              <>
                <button onClick={() => handleEditPost(Post.id, Post.slug)}>Edit Post</button>
                <DeleteButton
                  mutation={DELETE_POST_MUTATION}
                  variables={{ postId: Post.id }}
                  onCompleted={() => navigate('/posts')}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;