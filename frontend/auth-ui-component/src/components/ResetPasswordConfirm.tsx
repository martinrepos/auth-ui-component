import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/reset-password/confirm/${uid}/${token}/`,
        { password }
      );
      setMessage(res.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.error || 'Reset failed.');
      } else {
        setMessage('Reset failed.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold">Set a new password</h2>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full border p-2"
        placeholder="New password"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2">
        Reset Password
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
