import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext'; // ✅ You missed this import

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginAdmin } = useAdminContext(); // ✅ Using AdminContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    setLoading(true);
    const result = await loginAdmin(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      alert(result.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <input
        type="email"
        className="w-full border p-2 mb-4 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        className="w-full border p-2 mb-4 rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default AdminLogin;
