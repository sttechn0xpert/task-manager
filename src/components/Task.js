import React from "react";
import { chakra, useColorModeValue } from "@chakra-ui/react";
import { CONSTANT } from "../utils/constant";
import { useTasks } from "../common/context/TaskContext";
import { useColors } from "../common/hooks/useColor";

function Task({ task, onEditTask }) {
  const color = useColors();

  function getStatusDetails() {
    switch (task.status) {
      case "completed":
        return {
          title: "Completed",
          bg: color.completedBg,
          color: color.completedColor,
        };

      case "in_progress":
        return {
          title: "In Progress",
          bg: color.progressBg,
          color: color.progressColor,
        };

      default:
        return {
          title: "Pending",
          bg: color.pendingBg,
          color: color.pendingColor,
        };
    }
  }

  const status = getStatusDetails();
  const { deleteTask, markTaskComplete } = useTasks();
  /*
   * Prevent action buttons from triggering
   * the drag event.
   */
  function stopDrag(e) {
    e.stopPropagation();
  }

  return (
    <chakra.div
      p="16px"
      minH="230px"
      bg={color.cardBg}
      borderRadius="8px"
      border="1px solid"
      borderColor={color.dividerColor}
      boxShadow="0 2px 6px rgba(0, 0, 0, 0.08)"
      display="flex"
      flexDirection="column"
      gap="12px"
      position="relative"
    >
      {/* ================= HEADER ================= */}

      <chakra.div
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        gap="10px"
      >
        <chakra.p
          fontSize={{
            base: "14px",
            md: "16px",
          }}
          fontWeight="700"
          color={color.titleColor}
          lineHeight="1.4"
          noOfLines={2}
        >
          {task.title}
        </chakra.p>

        {/* Status Badge */}
        <chakra.span
          flexShrink={0}
          px="8px"
          py="4px"
          borderRadius="6px"
          fontSize="11px"
          fontWeight="600"
          bg={status.bg}
          color={status.color}
        >
          {status.title}
        </chakra.span>
      </chakra.div>

      {/* ================= DESCRIPTION ================= */}

      <chakra.p
        fontSize="13px"
        fontWeight="500"
        color={color.labelColor}
        mt="2px"
      >
        Description
      </chakra.p>

      <chakra.p
        fontSize="13px"
        color={color.descriptionColor}
        bg={color.descriptionBg}
        border="1px solid"
        borderColor={color.borderColor}
        borderRadius="8px"
        p="10px"
        minH="55px"
        noOfLines={2}
      >
        {task.description || CONSTANT.tasks.noNotesAdded}
      </chakra.p>

      {/* ================= SPACER ================= */}

      <chakra.div flex="1" />

      {/* ================= ACTIONS ================= */}

      <chakra.div
        display="flex"
        alignItems="center"
        gap="8px"
        borderTop="1px solid"
        borderColor={color.borderColor}
        pt="12px"
        onPointerDown={stopDrag}
        onClick={stopDrag}
      >
        {/* Edit */}
        {task.status !== "completed" && (
          <chakra.button
            flex="1"
            py="7px"
            px="8px"
            bg="transparent"
            border="1px solid"
            borderColor={color.actionBorder}
            borderRadius="6px"
            color={color.editColor}
            fontSize="12px"
            fontWeight="600"
            cursor="pointer"
            _hover={{
              bg: color.editHoverBg,
            }}
            onClick={(e) => {
              stopDrag(e);
              onEditTask(task);
            }}
          >
            Edit
          </chakra.button>
        )}
        {/* Mark Complete */}
        {task.status !== "completed" && (
          <chakra.button
            flex="1"
            py="7px"
            px="8px"
            bg="transparent"
            border="1px solid"
            borderColor={color.actionBorder}
            borderRadius="6px"
            color={color.completeColor}
            fontSize="12px"
            fontWeight="600"
            cursor="pointer"
            _hover={{
              bg: color.completeHoverBg,
            }}
            onClick={(e) => {
              stopDrag(e);
              markTaskComplete(task.id);
            }}
          >
            ✓ Complete
          </chakra.button>
        )}

        {/* Delete */}
        <chakra.button
          flex="1"
          py="7px"
          px="8px"
          bg="transparent"
          border="1px solid"
          borderColor={color.actionBorder}
          borderRadius="6px"
          color={color.deleteColor}
          fontSize="12px"
          fontWeight="600"
          cursor="pointer"
          _hover={{
            bg: color.deleteHoverBg,
          }}
          onClick={(e) => {
            stopDrag(e);
            deleteTask(task.id);
          }}
        >
          Delete
        </chakra.button>
      </chakra.div>
    </chakra.div>
  );
}

export default Task;
