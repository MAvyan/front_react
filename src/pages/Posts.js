import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { DELETE_POST_MUTATION } from '../Mutation';
import DeleteButton from '../buttons/DeleteButton';
import editPenIcon from '../assets/edit-pen.svg'; // Import the edit-pen SVG icon
import profileIcon from '../assets/profile.svg'; // Import the profile SVG icon
import readIcon from '../assets/read.svg'; // Import the read SVG icon

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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const handleViewDetails = (slug) => {
    navigate(`/post/${slug}`);
  };

  const handleViewProfile = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleEditPost = (id, slug) => {
    navigate(`/edit-post/${id}/${slug}`);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin;

  const totalPages = data ? Math.ceil(data.listPublications.length / postsPerPage) : 0;
  const currentPosts = data ? data.listPublications.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage) : [];

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-10 text-center">All Posts</h2>
      <div className="min-h-[calc(100vh-300px)] flex flex-col justify-between">
        <ul className="space-y-4">
          {currentPosts.map((post) => (
            <li key={post.id} className="bg-gray-800 text-white p-4 rounded-2xl shadow-2xl relative">
              {isAdmin && (
                <div className="absolute top-2 right-2 flex space-x-2 mt-2 mr-2">
                  <img
                    src={editPenIcon}
                    alt="Edit Post"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleEditPost(post.id, post.slug)}
                    style={{ filter: 'invert(100%)' }}
                  />
                  <DeleteButton
                    mutation={DELETE_POST_MUTATION}
                    variables={{ postId: post.id }}
                    onCompleted={() => navigate('/posts')}
                    className="mt-2 mr-2"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <div className="text-gray-400 mt-2">
                <span>By {post.user.fullname}</span> | <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <p className="mt-2">{truncateText(post.body, 10)}</p>
              <div className="mt-4 flex space-x-2">
                <div onClick={() => handleViewDetails(post.slug)} className="cursor-pointer flex items-center space-x-2">
                  <img src={readIcon} alt="View Details" className="w-5 h-5" style={{ filter: 'invert(100%)' }} />
                </div>
                <div onClick={() => handleViewProfile(post.user.id)} className="cursor-pointer flex items-center space-x-2">
                  <img src={profileIcon} alt="View Profile" className="w-5 h-5" style={{ filter: 'invert(100%)' }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;