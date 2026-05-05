import { updateTodo, deleteTodo } from '../adapters/todo-adapters';

function TodoItem({ todo, currentUser, onRefresh }) {
  const handleChange = async (e) => {
    const { error } = await updateTodo(todo.todo_id, { is_complete: e.target.checked });
    if (error) return console.error(error);
    onRefresh();
  };

  const handleDelete = async () => {
    const { error } = await deleteTodo(todo.todo_id);
    if (error) return console.error(error);
    onRefresh();
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.is_complete}
        onChange={handleChange}
      />
      <span className={todo.is_complete ? 'completed' : ''}>{todo.title}</span>
      {currentUser && (
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      )}
    </li>
  );
}

export default TodoItem;
