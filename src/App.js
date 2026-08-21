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
import { mockData } from "./utils/mockData";

import dottedMenu from "./common/images/dottedMenu.png";

import { DroppableContainer } from "./components/DroppableContainer";
import Header from "./components/Header";
import { DraggableItem } from "./components/DraggableItem";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { useColors } from "./utils/color";
import { StageMenu } from "./components/StageMenu";
import useLocalStorage from "./common/hooks/useLocalStorage";
import { useTasks } from "./common/context/TaskContext";
export default function App() {
  const inputRef = useRef(null);
  const colors = useColors();
  const { tasks, deleteTask, markTaskComplete, updateTaskStatus } = useTasks();
  /*
   * Task modal
   */
  const [isCreateTaskInfo, setIsCreateTaskInfo] = useState({
    isTaskModalOpen: false,
    mode: "create",
    task: null,
  });

  /*
   * Tasks
   */
  const [tasks, setTasks] = useLocalStorage(
    "taskManagerTasks",
    mockData.taskData,
  );
  /*
   * Status columns
   *
   * Keep "stage" naming here because your existing
   * DroppableContainer UI already expects it.
   *
   * Visually/functionally these are now TASK STATUSES.
   */
  const [statusList, setStatusList] = useState(CONSTANT.TaskStatusList);

  /*
   * Filter
   *
   * Assignment requirement:
   * All / Completed / Pending
   */
  const [taskFilter, setTaskFilter] = useState("all");

  /*
   * Stage menu state
   */
  const [openMenu, setOpenMenu] = useState(null);

  /*
   * Status editing
   */
  const [editingStatus, setEditingStatus] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [statusError, setStatusError] = useState({});

  /*
   * -----------------------------
   * Create / Edit Task
   * -----------------------------
   */
  function handleCreateTask(data) {
    setTasks((prev) => {
      const exists = prev.some((task) => task.id === data.id);

      /*
       * Edit
       */
      if (exists) {
        return prev.map((task) => (task.id === data.id ? data : task));
      }

      /*
       * Create
       *
       * New task always starts as Pending.
       */
      return [
        ...prev,
        {
          ...data,
          status: "pending",
        },
      ];
    });

    toast.success(
      data.id ? "Task saved successfully" : "Task created successfully",
    );
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
    const updatedTasks = tasks.filter((item) => item.id !== task.id);

    setTasks(updatedTasks);

    toast.success("Task deleted successfully");
  }

  /*
   * -----------------------------
   * Drag & Drop
   * -----------------------------
   *
   * This is the important part.
   *
   * When task is dragged into another status
   * column, its status changes.
   */
  function handleMarkComplete(task) {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === task.id
          ? {
              ...item,
              status: "completed",
            }
          : item,
      ),
    );

    toast.success("Task marked as completed");
  }
  function handleDragEnd({ active, over }) {
    if (!over) return;

    const activeId = active.id;

    /*
     * If dropped on a task, get the task's status.
     *
     * If dropped directly on a column,
     * get the column status.
     */
    let newStatus = over.data.current?.stage;

    /*
     * If dropped on another task
     */
    if (!newStatus) {
      const overTask = tasks.find((task) => task.id === over.id);

      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (!newStatus) return;

    /*
     * Find dragged task
     */
    const activeTask = tasks.find((task) => task.id === activeId);

    if (!activeTask) return;

    /*
     * Same status → nothing to change
     */
    if (activeTask.status === newStatus) {
      return;
    }

    /*
     * Update task status
     */
    setTasks((prev) =>
      prev.map((task) =>
        task.id === activeId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );
  }

  /*
   * -----------------------------
   * Status edit
   * -----------------------------
   *
   * We don't actually need custom
   * status creation for the assignment.
   *
   * But keeping this makes your existing
   * UI structure intact.
   */
  function statusChecker(status) {
    const oldTitle = status.title;

    const exists = statusList.some(
      (item) =>
        item.title.toLowerCase() === editValue.toLowerCase() &&
        item.id !== status.id,
    );

    if (!editValue.trim() || exists) {
      setEditValue(oldTitle);
      setEditingStatus(null);

      setStatusError((prev) => ({
        ...prev,
        [status.id]: false,
      }));

      return;
    }

    setStatusList((prev) =>
      prev.map((item) =>
        item.id === status.id
          ? {
              ...item,
              title: editValue,
            }
          : item,
      ),
    );

    setEditingStatus(null);
  }

  function statusHandler(e, status) {
    const exists = statusList.some(
      (item) =>
        item.title.toLowerCase() === e.target.value.toLowerCase() &&
        item.id !== status.id,
    );

    if (exists) {
      toast.error("Status title already exists", {
        position: "top-right",
        autoClose: 3000,
      });

      setStatusError((prev) => ({
        ...prev,
        [status.id]: true,
      }));
    }

    setEditValue(e.target.value);
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
          taskStatusList={statusList}
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
            /*
             * Tasks belonging to this column
             */
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

                  {/* Popup Menu */}
                  {openMenu === status.id && (
                    <StageMenu
                      stage={status}
                      onEdit={(item) => {
                        setEditingStatus(item.id);
                        setEditValue(item.title);
                      }}
                      onDelete={(item) => {
                        /*
                         * Do not allow deleting
                         * the three required
                         * task statuses.
                         */
                        toast.error("Default task statuses cannot be deleted.");

                        setOpenMenu(null);
                      }}
                      onClose={() => setOpenMenu(null)}
                    />
                  )}
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
                      onMarkComplete={handleMarkComplete}
                      task={task}
                      status={status}
                      onEditTask={handleEditTask}
                      onDeleteTask={handleDeleteTask}
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
