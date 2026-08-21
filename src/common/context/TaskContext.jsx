import { createContext, useContext } from "react";
import { mockData } from "../utils/mockData";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage(
    "taskManagerTasks",
    mockData.taskData,
  );

  function addTask(data) {
    setTasks((prev) => [
      ...prev,
      {
        ...data,
        id: data.id || "task_" + crypto.randomUUID(),
        status: "pending",
      },
    ]);
  }

  function updateTask(data) {
    setTasks((prev) => prev.map((task) => (task.id === data.id ? data : task)));
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  function markTaskComplete(taskId) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task,
      ),
    );
  }

  function updateTaskStatus(taskId, status) {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        updateTask,
        deleteTask,
        markTaskComplete,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
