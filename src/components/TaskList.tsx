import { useState } from "react";
import { Task } from "./Task";

const TASK_LIST = [
  { id: 1, text: "Aprender React", done: false },
  { id: 2, text: "Praticar CSS", done: true }
];

export const TaskList = () => {
  const [tasks, setTasks] = useState(TASK_LIST);
  const addTask = (text) => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
};
