import { CONSTANT } from "./constant";
import { mockData } from "./mockData";

export function camelToTitle(str) {
  if (!str) return;
  return str
    .replace(/([A-Z])/g, "$1") // insert space before capital letters
    .replace(/^./, (char) => char.toUpperCase()); // capitalize first letter
}
