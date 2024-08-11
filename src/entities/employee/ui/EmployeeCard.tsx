import React from "react";
import { Employee } from "@/entities/employee/model/employeeSlice";
import { Link } from "react-router-dom";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const roleTranslations: { [key: string]: string } = {
    cook: "Повар",
    waiter: "Официант",
    driver: "Водитель",
  };

  return (
    <div className={styles.card}>
      <h3>{employee.name}</h3>
      <p>{roleTranslations[employee.role]}</p>
      <p>{employee.phone}</p>
      <Link to={`/edit/${employee.id}`}>Редактировать</Link>
    </div>
  );
};

export default EmployeeCard;
