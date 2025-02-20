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
import EditPost from './pages/EditPost'; // Import the EditPost component
import ProtectedRoute from './protectedRoute';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import UpdateUser from './pages/UpdateUser';
import SearchResults from './pages/SearchResults'; // Import the SearchResults component

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
            //<ProtectedRoute requiredRole="admin">
              <Drafts />
            //</ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            //<ProtectedRoute requiredRole="admin">
              <CreatePost />
            //</ProtectedRoute>
          }
        />
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/edit-draft/:id/:slug" element={<EditDraft />} />
        <Route path="/edit-post/:id/:slug" element={<EditPost />} /> {/* Add the EditPost route */}
        <Route path="/users" element={<Users />} /> {/* New route */}
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/search-results" element={<SearchResults />} /> {/* Add the SearchResults route */}
      </Routes>
    </Router>
  );
}

function HeaderWrapper() {
  const location = useLocation();
  return location.pathname !== '/login' && <Header />;
}

export default App;