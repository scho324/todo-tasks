import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Trash2 } from "lucide-react";

type Status = "todo" | "in-progress" | "completed";

const statusLabels: Record<Status, string> = {
  todo: "To do",
  "in-progress": "In progress",
  completed: "Completed",
};

export default function TodoItem({ task }: { task: Doc<"todoTasks"> }) {
  const updateStatus = useMutation(api.todoTasks.updateStatus);
  const remove = useMutation(api.todoTasks.remove);

  const deadline = new Date(task.deadline);
  // eslint-disable-next-line react-hooks/purity
  const isOverdue = task.deadline < Date.now() && task.status !== "completed";

  return (
    <div className="flex items-start text-left justify-between gap-4 rounded-sm border p-4">
      <div className="flex-1 min-w-0">
        <h3
          className={
            task.status === "completed"
              ? "font-medium line-through text-muted-foreground"
              : "font-medium"
          }
        >
          {task.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
        <p
          className={
            isOverdue
              ? "text-xs text-red-500 mt-2"
              : "text-xs text-muted-foreground mt-2"
          }
        >
          {" "}
          Due {deadline.toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Select
          value={task.status}
          onValueChange={(value) =>
            void updateStatus({ id: task._id, status: value as Status })
          }
        >
          <SelectTrigger className="w-32.5">
            {statusLabels[task.status]}
          </SelectTrigger>
          <SelectContent>
            {Object.entries(statusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => void remove({ id: task._id })}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
