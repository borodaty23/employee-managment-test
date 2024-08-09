import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadEmployees,
  selectFilteredEmployees,
  setFilteredEmployees,
} from "@/entities/employee/model/employeeSlice";
import { RootState } from "@/app/store";
import EmployeeList from "@/features/EmployeeList/EmployeeList";
import FilterForm from "@/features/FilterForm/FilterForm";
import styles from "./EmployeeListPage.module.scss";
import employeesData from "@/employees.json";

const EmployeeListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { employees, filter, filteredEmployees } = useSelector(
    (state: RootState) => state.employees
  );

  console.log(filteredEmployees);

  useEffect(() => {
    if (!employees.length) {
      dispatch(loadEmployees(employeesData));
    }
  }, [dispatch, employees.length]);

  useEffect(() => {
    const updated = selectFilteredEmployees(employees, filter);
    dispatch(setFilteredEmployees(updated));
  }, [employees, filter, dispatch]);

  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.title}>Список сотрудников</h1>
      </header>
      <FilterForm />
      <EmployeeList employees={filteredEmployees} />
    </main>
  );
};

export default EmployeeListPage;
