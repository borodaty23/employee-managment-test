import { RootState } from "@/app/store";
import { EmployeeState } from "./employeeSlice";

export const selectEmployeeState = (state: RootState): EmployeeState =>
  state.employees;
