import { Box, chakra } from "@chakra-ui/react";

import { CONSTANT } from "../utils/constant";
import { useColors } from "../utils/color";

export function SearchFilter({
  taskFilter,
  setTaskFilter,
  taskStatusList,
  height = "48px",
}) {
  const colors = useColors();

  return (
    <Box
      display="flex"
      w={{
        base: "100%",
        md: "250px",
      }}
    >
      <chakra.select
        w="100%"
        h={height}
        value={taskFilter}
        onChange={(e) => setTaskFilter(e.target.value)}
        padding="0 12px"
        borderRadius="8px"
        border="1px solid"
        borderColor={colors.actionBorder}
        bg={colors.filterBg}
        color={colors.titleColor}
        cursor="pointer"
        fontSize={{
          base: "14px",
          md: "16px",
        }}
        outline="none"
        transition="all 0.2s ease"
        _hover={{
          bg: colors.filterHoverBg,
        }}
        _focus={{
          borderColor: colors.filterFocusBorder,
          boxShadow: "0 0 0 1px currentColor",
        }}
      >
        <option value="all">All Status</option>

        {taskStatusList.map((status) => (
          <option key={status.id} value={status.value}>
            {status.title}
          </option>
        ))}
      </chakra.select>
    </Box>
  );
}
