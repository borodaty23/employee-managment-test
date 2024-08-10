import React from "react";
import { useParams } from "react-router-dom";
import EmployeeForm from "@/features/EmployeeForm/EmployeeForm";
import styles from "./NewEmployeePage.module.scss";

const NewEmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добавить сотрудника сотрудника</h1>
      <EmployeeForm employeeId={id ? parseInt(id) : undefined} />
    </div>
  );
};

export default NewEmployeePage;
