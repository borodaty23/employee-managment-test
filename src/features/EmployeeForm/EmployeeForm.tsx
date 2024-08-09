import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  updateEmployee,
} from "@/entities/employee/model/employeeSlice";
import { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import styles from "./EmployeeForm.module.scss";

interface EmployeeFormProps {
  employeeId?: number;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employeeId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector((state: RootState) =>
    state.employees.employees.find((emp) => emp.id === employeeId)
  );

  const [name, setName] = useState(employee?.name || "");
  const [phone, setPhone] = useState(employee?.phone || "");
  const [birthdate, setBirthdate] = useState(employee?.birthday || "");
  const [role, setRole] = useState(employee?.role || "cook");
  const [isArchive, setIsArchive] = useState(employee?.isArchive || false);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPhone(employee.phone);
      setBirthdate(employee.birthday);
      setRole(employee.role);
      setIsArchive(employee.isArchive);
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = {
      id: employeeId || Date.now(),
      name,
      phone,
      birthday: birthdate,
      role,
      isArchive,
    };

    if (employeeId) {
      dispatch(updateEmployee(newEmployee));
    } else {
      dispatch(addEmployee(newEmployee));
    }

    navigate("/"); // Navigate to the employee list page
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Основные данные</legend>
        <div className={styles.field}>
          <label htmlFor="name">Имя:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="phone">Телефон:</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="+7 (999) 999-99-99"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="birthdate">Дата рождения:</label>
          <input
            id="birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="role">Должность:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="cook">Повар</option>
            <option value="waiter">Официант</option>
            <option value="driver">Водитель</option>
          </select>
        </div>
        <div className={styles.checkboxContainer}>
          <input
            id="isArchive"
            type="checkbox"
            checked={isArchive}
            onChange={(e) => setIsArchive(e.target.checked)}
          />
          <label htmlFor="isArchive">В архиве</label>
        </div>
        <button type="submit" className={styles.submitBtn}>
          Сохранить
        </button>
      </fieldset>
    </form>
  );
};

export default EmployeeForm;
