import { CalendarDays, CalendarClock, BriefcaseMedical } from "lucide-react";

export const specialties = [
  { id: "cardiology", label: "Cardiology" },
  { id: "pediatrics", label: "Pediatrics" },
  { id: "dermatology", label: "Dermatology" },
  { id: "radiology", label: "Radiology" },
  { id: "general surgery", label: "General Surgery" },
  { id: "psychiatry", label: "Psychiatry" },
];

export const sidebarLinks = [
  {
    role: ["patient"],
    title: "Doctor List",
    url: "",
    icon: BriefcaseMedical,
  },
  {
    role: ["doctor"],
    title: "Set Availability",
    url: "",
    icon: CalendarDays,
  },
  {
    role: ["doctor", "patient"],
    title: "Appointments",
    url: "/appointments",
    icon: CalendarClock,
  },
];