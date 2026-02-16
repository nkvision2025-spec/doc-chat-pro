
import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storageService.ts';
import { User } from './types.ts';
import Login from './components/Login.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import UserDashboard from './components/UserDashboard.tsx';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      StorageService.init();
      const savedUser = localStorage.getItem('docchat_session');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && typeof parsedUser === 'object' && parsedUser.username) {
            setCurrentUser(parsedUser);
          }
        } catch (e) {
          console.error("Failed to parse saved session:", e);
          localStorage.removeItem('docchat_session');
        }
      }
    } catch (err) {
      console.error("Initialization error:", err);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('docchat_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('docchat_session');
  };

  if (!isInitialized) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {currentUser.role === 'admin' ? (
        <AdminDashboard currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <UserDashboard currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
