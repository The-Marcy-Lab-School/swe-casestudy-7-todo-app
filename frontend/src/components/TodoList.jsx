import TodoItem from './TodoItem';

function TodoList({ todos, currentUser, onRefresh }) {
  return (
    <ul id="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.todo_id}
          todo={todo}
          currentUser={currentUser}
          onRefresh={onRefresh}
        />
      ))}
    </ul>
  );
}

export default TodoList;
