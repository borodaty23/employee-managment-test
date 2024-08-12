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
  sortType?: "name" | "birthday";
  sortOrder?: "asc" | "desc";
  currentPage?: number;
  perPage?: number;
}

export interface EmployeeState {
  employees: Employee[];
  filteredEmployees: Employee[];
  filter: Filter;
}

const initialState: EmployeeState = {
  employees: [],
  filteredEmployees: [],
  filter: {
    role: "",
    isArchive: false,
    sortType: "name",
    sortOrder: "asc",
    currentPage: 1,
    perPage: 5,
  },
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
        state.employees[index] = action.payload;
      }
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = { ...state.filter, ...action.payload };
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
  const filtered = employees.filter((emp) => {
    return (
      (!filter.role || emp.role === filter.role) &&
      (filter.isArchive === undefined || emp.isArchive === filter.isArchive)
    );
  });

  return filtered.sort((a, b) => {
    let comparison = 0;

    if (filter.sortType === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (filter.sortType === "birthday") {
      const dateA = parseDate(a.birthday).getTime();
      const dateB = parseDate(b.birthday).getTime();
      comparison = dateA - dateB;
    }

    return filter.sortOrder === "asc" ? comparison : -comparison;
  });
};

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day);
}

export default employeeSlice.reducer;
