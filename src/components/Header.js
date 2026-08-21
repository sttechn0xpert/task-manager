import {
  Box,
  chakra,
  IconButton,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { CONSTANT } from "../utils/constant";
import { useColors } from "../common/hooks/useColor";

function Header({ taskFilter, setTaskFilter, onCreateTask }) {
  const colors = useColors();

  const { colorMode, toggleColorMode } = useColorMode();

  const controlHeight = "48px";

  return (
    <chakra.div
      display="flex"
      padding={{
        base: "12px",
        md: "14px 20px",
      }}
      justifyContent="space-between"
      alignItems={{
        base: "stretch",
        md: "center",
      }}
      flexDirection={{
        base: "column",
        md: "row",
      }}
      gap={{
        base: "12px",
        md: "12px",
      }}
      borderBottom="1px solid"
      borderColor={colors.headerBorder}
      bg={colors.headerBg}
      color={colors.titleColor}
    >
      {/* ================= TOP ROW ================= */}
      <chakra.div
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        {/* Title */}
        <chakra.h3
          fontWeight="700"
          fontSize={{
            base: "20px",
            md: "26px",
          }}
          whiteSpace="nowrap"
        >
          {CONSTANT.common.appTitle}
        </chakra.h3>

        {/* Theme Toggle */}
        <Tooltip
          label={
            colorMode === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
          placement="bottom"
        >
          <IconButton
            aria-label="Toggle color mode"
            height={controlHeight}
            width={controlHeight}
            minW={controlHeight}
            borderRadius="8px"
            border="1px solid"
            borderColor={colors.actionBorder}
            bg={colors.themeButtonBg}
            color={colors.themeIconColor}
            transition="all 0.2s ease"
            _hover={{
              bg: colors.themeButtonHoverBg,
              transform: "translateY(-1px)",
            }}
            _active={{
              transform: "translateY(0)",
            }}
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </Tooltip>
      </chakra.div>

      {/* ================= CONTROLS ================= */}
      <chakra.div
        display="flex"
        alignItems="center"
        gap="12px"
        w={{
          base: "100%",
          md: "auto",
        }}
      >
        {/* Filter */}
        <Box
          display="flex"
          flex="1"
          minW={0}
          w={{
            base: "auto",
            md: "250px",
          }}
        >
          <chakra.select
            w="100%"
            h={controlHeight}
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

            {CONSTANT.TaskStatusList.map((status) => (
              <option key={status.id} value={status.value}>
                {status.title}
              </option>
            ))}
          </chakra.select>
        </Box>

        {/* Add Task */}
        <chakra.button
          flex="1"
          height={controlHeight}
          minW={{
            base: 0,
            md: "115px",
          }}
          padding="0 18px"
          border="1px solid"
          borderColor={colors.secondaryBtn}
          background={colors.secondaryBtn}
          color={colors.white}
          fontWeight="600"
          fontSize={{
            base: "15px",
            md: "16px",
          }}
          cursor="pointer"
          borderRadius="8px"
          transition="all 0.2s ease"
          onClick={onCreateTask}
          _hover={{
            background: colors.secondaryHover,
            transform: "translateY(-1px)",
          }}
          _active={{
            transform: "translateY(0)",
          }}
        >
          {CONSTANT.Header.createTask}
        </chakra.button>
      </chakra.div>
    </chakra.div>
  );
}

export default Header;
