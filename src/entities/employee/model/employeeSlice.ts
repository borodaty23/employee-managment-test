import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Employee {
  id: number;
  name: string;
  role: string;
  phone: string;
  birthday: string;
  isArchive: boolean;
}

interface Filter {
  role?: string;
  isArchive?: boolean;
}

interface EmployeeState {
  employees: Employee[];
  filteredEmployees: Employee[];
  filter: Filter;
}

const initialState: EmployeeState = {
  employees: [],
  filteredEmployees: [],
  filter: { role: "", isArchive: false },
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    loadEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
    },
    setFilteredEmployees(state, action: PayloadAction<Employee[]>) {
      state.filteredEmployees = action.payload;
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        console.log(44, action.payload);
        state.employees[index] = action.payload;
      }
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
  },
});

export const {
  loadEmployees,
  addEmployee,
  updateEmployee,
  setFilter,
  setFilteredEmployees,
} = employeeSlice.actions;

export const selectFilteredEmployees = (
  employees: Employee[],
  filter: Filter
) => {
  return employees.filter((emp) => {
    return (
      (!filter.role || emp.role === filter.role) &&
      (filter.isArchive === undefined || emp.isArchive === filter.isArchive)
    );
  });
};

export default employeeSlice.reducer;
