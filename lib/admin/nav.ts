import type { SvgIconComponent } from "@mui/icons-material";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: SvgIconComponent;
  disabled?: boolean;
};

export const adminNavItems: AdminNavItem[] = [
  {
    label: "Viagens",
    href: "/admin/viagens",
    icon: FlightTakeoffOutlinedIcon,
  },
];
