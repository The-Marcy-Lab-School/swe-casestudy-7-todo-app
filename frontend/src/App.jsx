import { useState, useEffect } from 'react';
import { getMe, login, register, logout } from './adapters/auth-adapters';
import { fetchAllTodos } from './adapters/todo-adapters';
import AuthForm from './components/AuthForm';
import TodoApp from './components/TodoApp';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Session rehydration: restore the logged-in user from a server-side session
  // cookie on every page load. React state doesn't survive a refresh; cookies do.
  useEffect(() => {
    const rehydrate = async () => {
      const { data: user } = await getMe();
      setCurrentUser(user);
    };
    rehydrate();
  }, []);

  // Auth-dependent effect: fetch todos only after we know who is logged in.
  // currentUser in the dependency array re-runs this effect on login and logout.
  const loadTodos = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: fetchError } = await fetchAllTodos();
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setTodos(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      loadTodos();
    } else {
      setTodos([]);
    }
  }, [currentUser]);

  const handleLogin = async (username, password) => {
    const { data: user, error } = await login(username, password);
    if (error) return error;
    setCurrentUser(user);
  };

  const handleRegister = async (username, password) => {
    const { data: user, error } = await register(username, password);
    if (error) return error;
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
  };

  return (
    <main>
      <h1>Todo App</h1>
      {currentUser
        ? <TodoApp
            todos={todos}
            currentUser={currentUser}
            onLogout={handleLogout}
            onRefresh={loadTodos}
            isLoading={isLoading}
            error={error}
          />
        : <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      }
    </main>
  );
}

export default App;
