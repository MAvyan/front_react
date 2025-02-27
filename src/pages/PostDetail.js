import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { DELETE_POST_MUTATION } from '../Mutation';
import DeleteButton from '../buttons/DeleteButton';
import leftArrowIcon from '../assets/left-arrow.svg'; // Import the left-arrow SVG icon

export const GET_POST_QUERY = gql`
  query GetPostQuery($slug: String!) {
    getPublication(slug: $slug) {
      id
      title
      slug
      body
      publishedAt
      user {
        fullname
      }
    }
  }
`;

function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_POST_QUERY, {
    variables: { slug },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const post = data?.getPublication;

  if (!post) {
    return <div>Post not found</div>;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin;

  return (
    <div className="container mx-auto p-4">
      <article className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
        <header className="mb-4 relative">
          <div className="absolute top-0 left-0">
            <img
              src={leftArrowIcon}
              alt="Back"
              className="w-6 h-6 cursor-pointer mb-2"
              onClick={() => navigate(-1)}
              style={{ filter: 'invert(100%)' }}
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 pl-8">{post.title}</h1>
          <div className="text-gray-400">
            <span>By {post.user.fullname}</span> | <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </header>
        <section className="prose prose-lg max-w-none mb-4 text-white">
          <p>{post.body}</p>
        </section>
        <footer className="mt-4 flex space-x-2">
          {isAdmin && (
            <DeleteButton
              mutation={DELETE_POST_MUTATION}
              variables={{ postId: post.id }}
              onCompleted={() => navigate('/posts')}
            />
          )}
        </footer>
      </article>
    </div>
  );
}

export default PostDetail;