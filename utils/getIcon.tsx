import * as Si from "react-icons/si";
import { IconType } from "react-icons";

export const getIcon = (name: string): IconType => {
  const iconMap = Si as Record<string, IconType>;
  return iconMap[name] || Si.SiPython;
};
