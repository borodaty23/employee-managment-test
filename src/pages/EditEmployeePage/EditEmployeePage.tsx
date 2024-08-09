import React from "react";
import { useParams } from "react-router-dom";
import EmployeeForm from "@/features/EmployeeForm/EmployeeForm";
import styles from "./EditEmployeePage.module.scss";

const EditEmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Редактировать сотрудника</h1>
      <EmployeeForm employeeId={parseInt(id)} />
    </div>
  );
};

export default EditEmployeePage;
