import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import TodoItem from "./todo-item";

export default function TodoList() {
  const tasks = useQuery(api.todoTasks.list);

  return (
    <div className="flex-1 border rounded-sm p-4">
      {tasks === undefined ? (
        <p className="text-muted-foreground">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-muted-foreground">No tasks.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TodoItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
