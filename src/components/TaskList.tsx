import { useEffect, useState } from "react";
import { Task } from "./Task";
import { AddTask } from "./AddTask";

const TASK_LIST = [
  { id: 1, text: "Aprender React", done: false },
  { id: 2, text: "Praticar CSS", done: true }
];

export const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) return JSON.parse(savedTasks);
    return TASK_LIST; // default tasks
  }); // executa apenas uma vez
  const [filter, setFilter] = useState(() => {
    const savedFilter = localStorage.getItem("taskFilter");
    if (savedFilter) return savedFilter;
    return "all"; // default filter
  }); // 'all', 'active', 'completed'

  const addTask = (text) => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true; // 'all'
  });

  // Salvar filtro
  useEffect(() => {
    if (!filter) return;
    localStorage.setItem("taskFilter", filter);
  }, [filter]);

  // Carregar filtro ao iniciar
  useEffect(() => {
    const savedFilter = localStorage.getItem("taskFilter");

    if (savedFilter) setFilter(savedFilter);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]); // Executa sempre que `tasks` mudar

  return (
    <section>
      <AddTask onAddTask={addTask} />
      <h2>Lista de Tarefas</h2>

      <button onClick={() => setTasks(tasks.filter((task) => !task.done))}>
        Limpar concluídas
      </button>

      <div className="filters">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("active")}>Ativas</button>
        <button onClick={() => setFilter("completed")}>Concluídas</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </ul>
    </section>
  );
};
