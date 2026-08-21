import { chakra, IconButton, Tooltip, useColorMode } from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { CONSTANT } from "../utils/constant";
import { SearchFilter } from "./SearchFilter";
import { useColors } from "../utils/color";

function Header({ taskFilter, setTaskFilter, taskStatusList, onCreateTask }) {
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
        base: "flex-start",
        md: "center",
      }}
      flexDirection={{
        base: "column",
        md: "row",
      }}
      gap={{
        base: "12px",
        md: "20px",
      }}
      borderBottom="1px solid"
      borderColor={colors.headerBorder}
      bg={colors.headerBg}
      color={colors.titleColor}
    >
      {/* ================= TITLE ================= */}

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

      {/* ================= CONTROLS ================= */}

      <chakra.div
        display="flex"
        alignItems="center"
        gap="12px"
        flexWrap="wrap"
        w={{
          base: "100%",
          md: "auto",
        }}
      >
        {/* Filter */}
        <SearchFilter
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
          taskStatusList={taskStatusList}
          height={controlHeight}
        />

        {/* Add Task */}
        <chakra.button
          height={controlHeight}
          minW="115px"
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
    </chakra.div>
  );
}

export default Header;
