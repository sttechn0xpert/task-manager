import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "Inter,sans-serif",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "Inter,sans-serif",
      },
    }),
  },
};
