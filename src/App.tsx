import AuthButton from "./components/auth-button";
import { Authenticated, Unauthenticated } from "convex/react";
import TodoList from "./components/todo-list";
import NewTodoTaskForm from "./components/new-todo-task-form";

function App() {
  return (
    <div>
      <AuthButton />
      <Unauthenticated>Please log in to track your todo tasks.</Unauthenticated>
      <Authenticated>
        <div className="gap-4 flex flex-wrap justify-between p-4">
          <NewTodoTaskForm />
          <TodoList />
        </div>
      </Authenticated>
    </div>
  );
}

export default App;
