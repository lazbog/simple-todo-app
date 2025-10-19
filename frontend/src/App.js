import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Dashboard from '@/components/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'dashboard'>('login');
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const hasValidToken = token && token.length > 0;
        setIsAuthenticated(hasValidToken);
        if (hasValidToken) {
          setCurrentPage('dashboard');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (token: string) => {
    try {
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleRegister = (token: string) => {
    try {
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setCurrentPage('login');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const switchToRegister = () => setCurrentPage('register');
  const switchToLogin = () => setCurrentPage('login');

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Render appropriate component based on authentication state and current page
  switch (currentPage) {
    case 'dashboard':
      return <Dashboard onLogout={handleLogout} />;
    case 'register':
      return <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />;
    case 'login':
    default:
      return <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />;
  }
}