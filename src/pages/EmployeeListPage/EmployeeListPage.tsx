import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Employee,
  loadEmployees,
  selectFilteredEmployees,
} from "@/entities/employee/model/employeeSlice";
import { RootState } from "@/app/store";
import EmployeeList from "@/features/EmployeeList/EmployeeList";
import FilterForm from "@/features/FilterForm/FilterForm";
import styles from "./EmployeeListPage.module.scss";
import employeesData from "@/employees.json"; // Импортируйте JSON-файл напрямую

const EmployeeListPage: React.FC = () => {
  const [updatedEmployees, setUpdatedEmployees] = useState<Employee[]>([]);
  const dispatch = useDispatch();
  const { employees, filter } = useSelector(
    (state: RootState) => state.employees
  );

  useEffect(() => {
    const updated = selectFilteredEmployees(employees, filter);
    setUpdatedEmployees(updated);
  }, [filter]);

  useEffect(() => {
    dispatch(loadEmployees(employeesData));

    const updated = selectFilteredEmployees(employees, filter);
    setUpdatedEmployees(updated);
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.title}>Список сотрудников</h1>
      </header>
      <FilterForm />
      <EmployeeList employees={updatedEmployees} />
    </main>
  );
};

export default EmployeeListPage;
