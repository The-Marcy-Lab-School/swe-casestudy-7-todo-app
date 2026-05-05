import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function TodoApp({ todos, currentUser, onLogout, onRefresh, isLoading, error }) {
  return (
    <section>
      <div id="user-controls">
        <span>Welcome, <strong>{currentUser.username}</strong>!</span>
        <button onClick={onLogout}>Log Out</button>
      </div>
      <AddTodoForm onRefresh={onRefresh} />
      {isLoading && <p>Loading todos...</p>}
      {error && <p className="error">Something went wrong: {error}</p>}
      <TodoList todos={todos} currentUser={currentUser} onRefresh={onRefresh} />
    </section>
  );
}

export default TodoApp;
