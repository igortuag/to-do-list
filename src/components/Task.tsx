export const Task = ({ task }) => {
  return <li>
    <input
      type="checkbox"
      checked={task.done}
      onChange={() => { }}
    />
    {task.text}
  </li>;
};
