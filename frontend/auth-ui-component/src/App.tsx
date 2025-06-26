import AuthForm from './components/AuthForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import Dashboard from './components/Dashboard'; // Change this to whatever you want as the dashboard
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* also change this to what you desire*/}
      <Route path="/reset-password" element={<ResetPasswordForm />} />
    </Routes>
  );
}

export default App;
