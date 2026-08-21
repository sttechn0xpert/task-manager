import { createContext, useContext } from "react";
import { toast } from "react-toastify";

import useLocalStorage from "../hooks/useLocalStorage";
import { mockData } from "../../utils/mockData";

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

    toast.success("Task created successfully");
  }

  function updateTask(data) {
    setTasks((prev) => prev.map((task) => (task.id === data.id ? data : task)));

    toast.success("Task updated successfully");
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    toast.success("Task deleted successfully");
  }

  function markTaskComplete(taskId) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed",
            }
          : task,
      ),
    );

    toast.success("Task marked as completed");
  }

  function updateTaskStatus(taskId, status) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
            }
          : task,
      ),
    );

    toast.success("Task status updated");
  }

  // Reorder tasks and persist the new order
  function reorderTasks(updatedTasks) {
    setTasks(updatedTasks);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        markTaskComplete,
        updateTaskStatus,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
