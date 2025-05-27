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

export const doctorsData = [
  { name: "Dr. Samantha", specialization: "Cardiology" },
  { name: "Dr. Raj Patel", specialization: "Cardiology" },
  { name: "Dr. Sarah Lin", specialization: "Cardiology" },
  { name: "Dr. Juan Gomez", specialization: "Cardiology" },
  { name: "Dr. Emily Chen", specialization: "Cardiology" },
  { name: "Dr. Alex Morgan", specialization: "Cardiology" },
  { name: "Dr. Priya Mehta", specialization: "Cardiology" },
  { name: "Dr. David Lee", specialization: "Cardiology" },
  { name: "Dr. Olivia Brown", specialization: "Cardiology" },
  { name: "Dr. Michael Nguyen", specialization: "Cardiology" }
];

export const patientData = [
  "John Smith",
  "Alice Johnson",
  "Bob Brown",
  "Diana Garcia",
  "Charlie Davis",
  "Fiona Martinez",
  "George Clark",
  "Hannah Miller",
  "Ethan Jones",
  "Jane Williams"
];


export const daysOfWeek: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
