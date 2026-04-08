import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Signup = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleLabels = {
    student: '01 / STUDENT',
    teacher: '02 / TEACHER',
    admin: '03 / ADMIN',
    administrator: '04 / ADMINISTRATOR',
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!roleLabels[role]) {
      setError('Invalid role selected.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const result = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      selectedRole: role,
    });

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    navigate(`/${result.user.role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-black border border-[#222] p-8">
        <div className="mb-6">
          <div className="font-mono text-xs text-accent tracking-widest uppercase font-bold mb-4">
            {roleLabels[role] || 'Create Account'}
          </div>
          <h1 className="font-syne text-3xl font-bold text-white">Sign Up</h1>
          <p className="mt-2 font-mono text-xs tracking-widest text-[#555] uppercase">
            Create your portal access
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 border border-red-900 bg-red-950/20 text-red-400 font-mono text-xs">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black border border-[#555] px-3 py-2 text-white font-mono text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="Your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black border border-[#555] px-3 py-2 text-white font-mono text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-black border border-[#555] px-3 py-2 text-white font-mono text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="Create a password"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-black border border-[#555] px-3 py-2 text-white font-mono text-sm focus:border-accent focus:outline-none transition-colors"
            placeholder="Repeat your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black border border-white text-white font-mono text-sm tracking-widest uppercase py-2 hover:bg-accent hover:text-black hover:border-accent transition-all disabled:opacity-50 mb-3"
        >
          {loading ? 'Creating account...' : 'Create Account ->'}
        </button>

        <div className="mt-6 text-center space-y-3">
          <div>
            <Link
              to={`/login/${role}`}
              className="font-mono text-xs text-accent hover:text-white transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
          <div>
            <Link to="/" className="font-mono text-xs text-[#555] hover:text-white transition-colors">
              &lt;- Back to role select
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
