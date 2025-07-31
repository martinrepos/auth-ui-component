import AuthForm from './components/AuthForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import ResetPasswordConfirm from './components/ResetPasswordConfirm';
import Dashboard from './components/Dashboard'; // Change this to whatever you want as the dashboard
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* also change this to what you desire*/}
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/reset-password/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
    </Routes>
  );
}

export default App;
