import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function NewTodoTaskForm() {
  const create = useMutation(api.todoTasks.create);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  /**
   * On submit, makes a new task
   */
  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    if (!name.trim() || !deadline) return;

    void create({
      name: name.trim(),
      description: description.trim(),
      deadline: new Date(parseDate(deadline)).getTime(),
    });

    setName("");
    setDescription("");
    setDeadline("");
  };

  /**
   * Gets the date as a local string, since parsing it as-is uses UTC
   */
  function parseDate(dateString: string): number {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day).getTime();
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-sm border p-4 shrink-0 w-72"
      >
        <Textarea
          placeholder="Task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="date"
          className="text-muted-foreground"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <Button type="submit">Add todo task</Button>
      </form>
    </div>
  );
}
