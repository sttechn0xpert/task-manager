import { useColorModeValue } from "@chakra-ui/react";

export function useColors() {
  return {
    // =========================
    // APP
    // =========================
    pageBg: useColorModeValue("gray.100", "#111827"),

    textColor: useColorModeValue("gray.800", "gray.100"),

    dividerColor: useColorModeValue("gray.200", "gray.700"),

    // =========================
    // HEADER
    // =========================
    headerBg: useColorModeValue("white", "#171C28"),

    headerBorder: useColorModeValue("gray.200", "gray.700"),

    // =========================
    // COLUMNS
    // =========================
    columnBg: useColorModeValue("gray.50", "#1A202C"),

    columnBorder: useColorModeValue("gray.200", "gray.374151"),

    columnHoverBorder: useColorModeValue("blue.300", "blue.500"),

    columnTrackBg: useColorModeValue("gray.200", "#111827"),

    // =========================
    // COUNT
    // =========================
    statusCountBg: useColorModeValue("gray.200", "gray.700"),

    statusCountColor: useColorModeValue("gray.700", "gray.200"),

    emptyTextColor: useColorModeValue("gray.500", "gray.400"),

    // =========================
    // TASK CARD
    // =========================
    cardBg: useColorModeValue("white", "gray.800"),

    titleColor: useColorModeValue("gray.800", "gray.100"),

    labelColor: useColorModeValue("gray.600", "gray.400"),

    descriptionBg: useColorModeValue("gray.50", "gray.700"),

    descriptionColor: useColorModeValue("gray.700", "gray.200"),

    borderColor: useColorModeValue("gray.200", "gray.600"),

    actionBorder: useColorModeValue("gray.200", "gray.600"),

    // =========================
    // ACTIONS
    // =========================
    editColor: useColorModeValue("blue.600", "blue.300"),

    completeColor: useColorModeValue("green.600", "green.300"),

    deleteColor: useColorModeValue("red.500", "red.300"),

    editHoverBg: useColorModeValue("blue.50", "blue.900"),

    completeHoverBg: useColorModeValue("green.50", "green.900"),

    deleteHoverBg: useColorModeValue("red.50", "red.900"),

    // =========================
    // STATUS
    // =========================
    pendingBg: useColorModeValue("orange.50", "orange.900"),

    pendingColor: useColorModeValue("orange.600", "orange.300"),

    progressBg: useColorModeValue("blue.50", "blue.900"),

    progressColor: useColorModeValue("blue.600", "blue.300"),

    completedBg: useColorModeValue("green.50", "green.900"),

    completedColor: useColorModeValue("green.600", "green.300"),

    // =========================
    // BUTTON
    // =========================
    secondaryBtn: useColorModeValue("orange.400", "orange.500"),

    secondaryHover: useColorModeValue("orange.500", "orange.400"),

    // =========================
    // FILTER
    // =========================
    filterBg: useColorModeValue("white", "gray.800"),

    filterHoverBg: useColorModeValue("gray.50", "gray.700"),

    filterFocusBorder: useColorModeValue("blue.400", "blue.400"),

    // =========================
    // THEME BUTTON
    // =========================
    themeButtonBg: useColorModeValue("white", "gray.800"),

    themeButtonHoverBg: useColorModeValue("gray.100", "gray.700"),

    themeIconColor: useColorModeValue("gray.700", "yellow.300"),

    // =========================
    // SCROLLBAR
    // =========================
    scrollbarThumb: useColorModeValue("gray.300", "gray.600"),

    scrollbarThumbHover: useColorModeValue("gray.400", "gray.500"),

    // =========================
    // MODAL
    // =========================
    modalBg: useColorModeValue("white", "#171C28"),

    modalBorder: useColorModeValue("gray.200", "gray.700"),

    modalOverlay: useColorModeValue("blackAlpha.300", "blackAlpha.700"),

    modalTitleColor: useColorModeValue("gray.800", "gray.100"),

    // =========================
    // MODAL FORM
    // =========================
    inputBg: useColorModeValue("white", "#1F2937"),

    inputColor: useColorModeValue("gray.800", "gray.100"),

    inputBorder: useColorModeValue("gray.300", "gray.600"),

    inputHoverBorder: useColorModeValue("gray.400", "gray.500"),

    inputFocusBorder: useColorModeValue("blue.400", "blue.400"),

    placeholderColor: useColorModeValue("gray.400", "gray.500"),

    // =========================
    // MODAL CANCEL BUTTON
    // =========================
    cancelBg: useColorModeValue("white", "#171C28"),

    cancelHoverBg: useColorModeValue("gray.100", "gray.700"),

    // =========================
    // ERROR
    // =========================
    error: useColorModeValue("red.500", "red.300"),
    // =========================
    // MODAL ACTIONS
    // =========================
    cancelBg: useColorModeValue("white", "#171C28"),

    cancelHoverBg: useColorModeValue("gray.100", "gray.700"),

    actionBorder: useColorModeValue("gray.200", "gray.600"),
    dragItemBg: useColorModeValue("transparent", "transparent"),
    // =========================
    // COLUMNS
    // =========================

    columnBg: useColorModeValue("gray.50", "#1A202C"),

    columnBorder: useColorModeValue("gray.200", "gray.700"),

    columnHoverBorder: useColorModeValue("blue.300", "blue.500"),

    // Status-based column backgrounds
    pendingColumnBg: useColorModeValue("#f5f1e5", "rgba(255, 181, 71, 0.08)"),

    pendingColumnBorder: useColorModeValue(
      "#fdd190",
      "rgba(255, 181, 71, 0.35)",
    ),

    progressColumnBg: useColorModeValue("#EEF4FF", "rgba(57, 101, 255, 0.08)"),

    progressColumnBorder: useColorModeValue(
      "#3965FF",
      "rgba(57, 101, 255, 0.35)",
    ),

    completedColumnBg: useColorModeValue("#E6FAF5", "rgba(1, 181, 116, 0.08)"),

    completedColumnBorder: useColorModeValue(
      "#01B574",
      "rgba(1, 181, 116, 0.35)",
    ),
  };
}
