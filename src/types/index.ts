export type RoleType = "doctor" | "patient" | null;

export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  role: RoleType;
  specialization?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface UserCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface TimeSlot {
  _id?: string;
  from: string;
  to: string;
  dcotor?:string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DaySchedule {
  _id?: string;
  doctorId?: string;
  day: string;
  enabled: boolean;
  slots: TimeSlot[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Visibility {
  field: "password" | "confirmPassword";
  isOpen: boolean;
}

export interface DoctorScheduleInterface {
  date: string;
  day: string;
  _id?: string;
  slots?: TimeSlot[];
}

export interface AppointmentInterface {
  _id?:string
  doctorId?: string;
  reason?: string;
  slotId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentListInterface {
  _id?:string
  doctor?: UserInterface;
  patient?: UserInterface;
  reason?: string;
  slot?: TimeSlot;
  createdAt?: string;
  updatedAt?: string;
}
