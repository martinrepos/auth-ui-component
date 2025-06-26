import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow text-center">
      {isLoggedIn ? (
        <h2 className="text-2xl font-bold text-green-600">You're logged in</h2>
      ) : (
        <h2 className="text-2xl font-bold text-red-600">You're not logged in</h2>
      )}
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-blue-400 text-white rounded hover:bg-red-400 transition-colors"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
