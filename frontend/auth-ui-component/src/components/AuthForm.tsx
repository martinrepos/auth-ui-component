import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const navigate = useNavigate(); // Use navigate to redirect after successful login or registration

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update form data state
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => setIsLogin(!isLogin); // Toggle between login and register forms

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:8000/api/token/', {
          username: formData.username,
          password: formData.password,
        });
        localStorage.setItem('access', res.data.access);
        alert('Login successful');
        navigate('/dashboard'); // Redirect to dashboard after successful login
      } else {
        await axios.post('http://localhost:8000/register/', formData);
        alert('Registration successful, you can now log in.');
        setIsLogin(true);
      }
    } catch (error: unknown) {
      // Type guard for AxiosError
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        console.log('Full error response:', error.response);
        // Try to show a detail message if present, else show the whole error data
        if (data && typeof data === 'object' && 'detail' in data) {
          alert((data as { detail: string }).detail);
        } else if (data) {
          alert(JSON.stringify(data));
        } else {
          alert('An unknown error occurred.');
        }
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded"
          required
        />
        {!isLogin && (
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
        )}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
            required
          />
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {isLogin ? 'Login' : 'Register'}
        </button>
        <button type="button" onClick={toggleMode} className="text-sm text-blue-600 underline mt-2">
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </form>
    </div>
  );
}
