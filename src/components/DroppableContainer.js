import { useDroppable } from "@dnd-kit/core";
import { chakra } from "@chakra-ui/react";
import { useColors } from "../common/hooks/useColor";

export const DroppableContainer = ({ id, children, ...rest }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: rest,
  });
  const colors = useColors();
  const columnColors = {
    pending: {
      bg: colors.pendingColumnBg,
      border: colors.pendingColumnBorder,
    },
    in_progress: {
      bg: colors.progressColumnBg,
      border: colors.progressColumnBorder,
    },
    completed: {
      bg: colors.completedColumnBg,
      border: colors.completedColumnBorder,
    },
  }[rest.stage];

  return (
    <chakra.div
      ref={setNodeRef}
      flex="1"
      minW={{ base: "280px", md: "0" }}
      borderRadius="14px"
      border="1px solid"
      bg={columnColors?.bg || colors.columnBg}
      borderColor={
        isOver
          ? colors.columnHoverBorder
          : columnColors?.border || colors.columnBorder
      }
      overflow="visible"
      flexShrink={0}
      transition="all 0.2s ease"
    >
      {children}
    </chakra.div>
  );
};
