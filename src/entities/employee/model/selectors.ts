import { RootState } from "@/app/store";
import { EmployeeState } from "./employeeSlice";

// Селектор для получения всего состояния сотрудников
export const selectEmployeeState = (state: RootState): EmployeeState =>
  state.employees;
