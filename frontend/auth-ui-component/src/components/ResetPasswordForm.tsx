import { useState } from 'react';
import axios from 'axios';

export default function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/reset-password/', { email });
      setMessage(res.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.error || 'Something went wrong.');
      } else {
        setMessage('Something went wrong.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold">Forgot your password?</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border p-2"
        placeholder="Enter your email"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2">
        Send Reset Link
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
