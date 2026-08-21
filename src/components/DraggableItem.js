import { useDraggable, useDroppable } from "@dnd-kit/core";
import { chakra } from "@chakra-ui/react";
import Task from "./Task";
import { useColors } from "../common/hooks/useColor";

export const DraggableItem = ({ id, task, onEditTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: task,
  });

  const { setNodeRef: setDropRef } = useDroppable({
    id,
    data: task,
  });

  const colors = useColors();

  return (
    <chakra.div
      mb="12px"
      ref={(node) => {
        setNodeRef(node);
        setDropRef(node);
      }}
      {...listeners}
      {...attributes}
      style={{
        background: colors.dragItemBg,
        borderRadius: "8px",
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <Task task={task} onEditTask={onEditTask} />
    </chakra.div>
  );
};
