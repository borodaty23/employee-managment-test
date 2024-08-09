import React from "react";
import { Employee } from "@/entities/employee/model/employeeSlice";
import EmployeeCard from "@/entities/employee/ui/EmployeeCard";
import styles from "./EmployeeList.module.scss";

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <section className={styles.list}>
      {employees.length > 0 ? (
        employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))
      ) : (
        <p>Нет сотрудников для отображения.</p>
      )}
    </section>
  );
};

export default EmployeeList;
