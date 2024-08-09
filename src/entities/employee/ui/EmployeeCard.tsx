import React from "react";
import { Employee } from "@/entities/employee/model/employeeSlice";
import { Link } from "react-router-dom";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className={styles.card}>
      <h3>{employee.name}</h3>
      <p>{employee.role}</p>
      <p>{employee.phone}</p>
      <Link to={`/edit/${employee.id}`}>Редактировать</Link>
    </div>
  );
};

export default EmployeeCard;
