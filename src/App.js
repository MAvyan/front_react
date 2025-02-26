import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Drafts from './pages/Drafts';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import UserDetail from './pages/UserDetail';
import EditDraft from './pages/EditDraft';
import EditPost from './pages/EditPost';
import ProtectedRoute from './protectedRoute';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import UpdateUser from './pages/UpdateUser';
import SearchResults from './pages/SearchResults';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.isAdmin;

  return (
    <Router>
      <HeaderWrapper />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Posts />} />
        <Route path="/posts" element={<Posts />} />
        {isAdmin && (
          <>
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
            <Route
              path="/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-user"
              element={
                <ProtectedRoute requiredRole="admin">
                  <CreateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-user/:id"
              element={
                <ProtectedRoute requiredRole="admin">
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
          </>
        )}
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/edit-draft/:id/:slug" element={<EditDraft />} />
        <Route path="/edit-post/:id/:slug" element={<EditPost />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  return location.pathname !== '/login' && <Header />;
}

export default App;