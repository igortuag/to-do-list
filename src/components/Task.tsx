export const Task = ({ task, onToggle }) => {
  return <li>
    <input
      type="checkbox"
      checked={task.done}
      onChange={() => onToggle(task.id)}
    />
    {task.text}
  </li>;
};
