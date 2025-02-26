import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      <ul className="space-y-4">
        {data && data.listPublications.map((post) => (
          <li key={post.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="mt-2">{post.body}</p>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleViewDetails(post.slug)} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">View Details</button>
              <button onClick={() => handleViewProfile(post.user.id)} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">View Profile</button>
              {isAdmin && (
                <>
                  <button onClick={() => handleEditPost(post.id, post.slug)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">Edit Post</button>
                  <DeleteButton
                    mutation={DELETE_POST_MUTATION}
                    variables={{ postId: post.id }}
                    onCompleted={() => navigate('/posts')}
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;