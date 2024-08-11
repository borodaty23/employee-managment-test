import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from "@/features/EmployeeForm";
import styles from "./NewEmployeePage.module.scss";

const NewEmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добавить сотрудника сотрудника</h1>
      <button className={styles.backButton} onClick={handleGoBack}>
        Назад
      </button>
      <EmployeeForm employeeId={id ? parseInt(id) : undefined} />
    </div>
  );
};

export default NewEmployeePage;
