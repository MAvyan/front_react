import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Posts from './Posts';
import Drafts from './Drafts';
import CreatePost from './CreatePost';
import PostDetail from './PostDetail';
import UserDetail from './UserDetail';
import EditDraft from './EditDraft';
import ProtectedRoute from './protectedRoute';

function App() {
  return (
    <Router>
      <HeaderWrapper />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Posts />} />
        <Route path="/posts" element={<Posts />} />
        <Route
          path="/drafts"
          element={
            <ProtectedRoute requiredRole="admin">
              <Drafts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute requiredRole="admin">
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/edit-draft/:id" element={<EditDraft />} />
      </Routes>
    </Router>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  return location.pathname !== '/login' && <Header />;
}

export default App;