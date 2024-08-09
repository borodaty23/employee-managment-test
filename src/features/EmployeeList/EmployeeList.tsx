import React from "react";
import { Employee } from "@/entities/employee/model/employeeSlice";
import EmployeeCard from "@/entities/employee/ui/EmployeeCard";
import styles from "./EmployeeList.module.scss";
import { useNavigate } from "react-router-dom";

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <button onClick={() => navigate("/new")} className={styles.addButton}>
        Добавить сотрудника
      </button>
      <section className={styles.list}>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))
        ) : (
          <p>Нет сотрудников для отображения.</p>
        )}
      </section>
    </div>
  );
};

export default EmployeeList;
