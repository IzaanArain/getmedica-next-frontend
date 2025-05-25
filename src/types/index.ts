

export type RoleType = "doctor" | "patient" | null;

export interface UserInterface {
  _id?: string
  name: string
  email: string
  role: RoleType
  specialization: string | null
  createdAt?: string
  updatedAt?: string
}
export interface UserCredentials { email: string; password: string }

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
}


export interface ApiErrorResponse {
  statusCode: number
  message: string | string[]
  error: string
}

