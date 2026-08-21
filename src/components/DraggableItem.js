import { useEffect, useRef, useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";

import { chakra } from "@chakra-ui/react";
import { globalStyles } from "../common/theme/styles";
import Task from "./Task";
import { useColors } from "../common/hooks/useColor";
export const DraggableItem = ({ id, task, onEditTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: task,
  });
  const { setNodeRef: setDropRef } = useDroppable({ id, data: task });
  const colors = useColors();
  return (
    <chakra.div
      mb="12px"
      ref={(node) => {
        setNodeRef(node);
        setDropRef(node);
      }}
      style={{
        margin: "10px",
        background: colors.dragItemBg,
        borderRadius: "8px",
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        cursor: "grab",
      }}
      {...listeners}
      {...attributes}
    >
      <Task task={task} onEditTask={onEditTask}></Task>
    </chakra.div>
  );
};
