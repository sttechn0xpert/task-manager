import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import system from "./common/theme/theme";

import { DndContext } from "@dnd-kit/core";
import { chakra } from "@chakra-ui/react";

import "./common/theme/globalStyle.css";

import { ToastContainer, toast } from "react-toastify";

import { CONSTANT } from "./utils/constant";

import dottedMenu from "./common/images/dottedMenu.png";

import { DroppableContainer } from "./components/DroppableContainer";
import Header from "./components/Header";
import { DraggableItem } from "./components/DraggableItem";
import { CreateTaskModal } from "./components/CreateTaskModal";
import useLocalStorage from "./common/hooks/useLocalStorage";
import { useTasks } from "./common/context/TaskContext";
import { useColors } from "./common/hooks/color";
export default function App() {
  const inputRef = useRef(null);
  const colors = useColors();
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    markTaskComplete,
    updateTaskStatus,
  } = useTasks();

  const [isCreateTaskInfo, setIsCreateTaskInfo] = useState({
    isTaskModalOpen: false,
    mode: "create",
    task: null,
  });

  const [statusList, setStatusList] = useState(CONSTANT.TaskStatusList);

  const [taskFilter, setTaskFilter] = useState("all");

  /*
   * Status editing
   */
  const [editValue, setEditValue] = useState("");
  const [statusError, setStatusError] = useState({});

  /*
   * -----------------------------
   * Create / Edit Task
   * -----------------------------
   */
  function handleCreateTask(data) {
    const exists = tasks.some((task) => task.id === data.id);

    if (exists) {
      updateTask({
        ...data,
        status: data.status || "pending",
      });
    } else {
      addTask({
        ...data,
        status: "pending",
      });
    }
  }

  /*
   * -----------------------------
   * Edit Task
   * -----------------------------
   */
  function handleEditTask(task) {
    setIsCreateTaskInfo({
      isTaskModalOpen: true,
      mode: "edit",
      task,
    });
  }

  /*
   * -----------------------------
   * Delete Task
   * -----------------------------
   */
  function handleDeleteTask(task) {
    deleteTask(task.id);
  }
  /*
   * -----------------------------
   * Drag & Drop
   * -----------------------------
   *
   * When task is dragged into another status
   * column, its status changes.
   */
  function handleMarkComplete(task) {
    markTaskComplete(task.id);
  }
  function handleDragEnd({ active, over }) {
    if (!over) return;

    const activeId = active.id;

    let newStatus = over.data.current?.stage;

    if (!newStatus) {
      const overTask = tasks.find((task) => task.id === over.id);

      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (!newStatus) return;

    const activeTask = tasks.find((task) => task.id === activeId);

    if (!activeTask) return;

    if (activeTask.status === newStatus) {
      return;
    }

    updateTaskStatus(activeId, newStatus);
  }

  /*
   * -----------------------------
   * Filter tasks
   * -----------------------------
   *
   * All
   * Completed
   * Pending
   *
   * In Progress is considered Pending
   * for the assignment filter.
   */
  function getFilteredTasks() {
    if (taskFilter === "completed") {
      return tasks.filter((task) => task.status === "completed");
    }
    if (taskFilter === "in_progress") {
      return tasks.filter((task) => task.status === "in_progress");
    }
    if (taskFilter === "pending") {
      return tasks.filter((task) => task.status === "pending");
    }

    return tasks;
  }

  const filteredTasks = getFilteredTasks();

  /*
   * -----------------------------
   * Close Task Modal
   * -----------------------------
   */
  function closeTaskModal() {
    setIsCreateTaskInfo({
      isTaskModalOpen: false,
      mode: "create",
      task: null,
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box minH="100vh" bg={colors.pageBg} color={colors.textColor}>
        <ToastContainer />

        {/* ================= HEADER ================= */}

        <Header
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
          onCreateTask={() =>
            setIsCreateTaskInfo({
              isTaskModalOpen: true,
              mode: "create",
              task: null,
            })
          }
        />

        {/* Divider */}
        <Box
          w="100%"
          border={1}
          background={colors.dividerColor}
          height="0.5px"
        />

        {/* ================= STATUS COLUMNS ================= */}

        <Box
          display="flex"
          gap="20px"
          margin={{
            base: "10px",
            md: "15px",
          }}
          overflowX="auto"
          overflowY="hidden"
          pb="10px"
          bg={colors.pageBg}
          css={{
            "&::-webkit-scrollbar": {
              height: "8px",
            },

            "&::-webkit-scrollbar-track": {
              background: colors.columnTrackBg,
              borderRadius: "10px",
            },

            "&::-webkit-scrollbar-thumb": {
              background: colors.scrollbarThumb,
              borderRadius: "10px",
            },

            "&::-webkit-scrollbar-thumb:hover": {
              background: colors.scrollbarThumbHover,
            },
          }}
        >
          {statusList.map((status) => {
            const statusTasks = filteredTasks.filter(
              (task) => task.status === status.value,
            );

            return (
              <DroppableContainer
                key={status.id}
                id={status.id}
                stage={status.value}
              >
                {/* Column Header */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  position="relative"
                >
                  {/* Status title */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <chakra.h3
                      textAlign="center"
                      padding={{
                        base: "10px",
                        md: "15px",
                      }}
                      textColor={colors.textColor}
                      fontSize={{
                        base: "14px",
                        md: "16px",
                      }}
                    >
                      {status.title}
                    </chakra.h3>

                    {/* Count */}
                    <chakra.h3
                      textAlign="center"
                      padding={{
                        base: "4px 8px",
                        md: "4px 10px",
                      }}
                      bg={colors.statusCountBg}
                      borderRadius="6px"
                      fontSize={{
                        base: "13px",
                        md: "14px",
                      }}
                    >
                      {statusTasks.length}
                    </chakra.h3>
                  </Box>
                </Box>

                {/* Divider */}
                <Box
                  w="100%"
                  border={1}
                  background={colors.dividerColor}
                  height="0.5px"
                />

                {/* ================= TASKS ================= */}

                <Box
                  padding={{
                    base: "10px",
                    md: "15px",
                  }}
                >
                  {statusTasks.map((task) => (
                    <DraggableItem
                      key={task.id}
                      id={task.id}
                      task={task}
                      onEditTask={handleEditTask}
                    />
                  ))}

                  {/* Empty column */}
                  {statusTasks.length === 0 && (
                    <Text
                      textAlign="center"
                      py="30px"
                      color={colors.emptyTextColor}
                      fontSize="14px"
                    >
                      No tasks
                    </Text>
                  )}
                </Box>
              </DroppableContainer>
            );
          })}
        </Box>

        {/* ================= CREATE / EDIT TASK ================= */}

        <CreateTaskModal
          task={isCreateTaskInfo.task}
          mode={isCreateTaskInfo.mode}
          isOpen={isCreateTaskInfo.isTaskModalOpen}
          onClose={closeTaskModal}
          onSave={handleCreateTask}
        />
      </Box>
    </DndContext>
  );
}
