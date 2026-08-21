import { useDroppable } from "@dnd-kit/core";
import { chakra } from "@chakra-ui/react";
import { useColors } from "../common/hooks/color";

export const DroppableContainer = ({ id, children, ...rest }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: rest,
  });

  const colors = useColors();

  return (
    <chakra.div
      ref={setNodeRef}
      flex="1"
      minW={{ base: "280px", md: "0" }}
      bg={colors.columnBg}
      borderRadius="14px"
      border="1px solid"
      borderColor={isOver ? colors.columnHoverBorder : colors.dividerColor}
      overflow="visible"
      flexShrink={0}
      transition="all 0.2s ease"
    >
      {children}
    </chakra.div>
  );
};
