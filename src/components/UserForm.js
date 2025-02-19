import React from 'react';

function UserForm({ fullname, setFullname, isAdmin, setIsAdmin, password, setPassword, handleSubmit, loading, error, isUpdate }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullname">Fullname:</label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="isAdmin">Is Admin:</label>
        <input
          type="checkbox"
          id="isAdmin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : isUpdate ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
}

export default UserForm;