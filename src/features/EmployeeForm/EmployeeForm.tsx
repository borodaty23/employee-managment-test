import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import {
  addEmployee,
  updateEmployee,
} from "@/entities/employee/model/employeeSlice";
import { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import styles from "./EmployeeForm.module.scss";
import { toast } from "react-toastify";
import { selectEmployeeState } from "@/entities/employee/model/selectors";

interface EmployeeFormProps {
  employeeId?: number;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employeeId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees } = useSelector((state: RootState) =>
    selectEmployeeState(state)
  );

  const employee = employees.find((emp) => emp.id === employeeId);
  const [name, setName] = useState(employee?.name || "");
  const [phone, setPhone] = useState(employee?.phone || "");
  const [birthdate, setBirthdate] = useState(employee?.birthday || "");
  const [role, setRole] = useState(employee?.role || "cook");
  const [isArchive, setIsArchive] = useState(employee?.isArchive || false);
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");

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

    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phone)) {
      setPhoneError(
        "Пожалуйста, введите полный номер телефона в формате +7 (999) 999-99-99"
      );
      return;
    }

    if (name.trim() === "") {
      setPhoneError("Имя не может быть пустым");
      return;
    }

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
      toast.success("Сотрудник успешно обновлён!");
    } else {
      dispatch(addEmployee(newEmployee));
      toast.success("Сотрудник успешно добавлен!");
    }

    navigate("/");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setPhoneError("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const trimmedValue = inputValue.replace(/^\s+/, "");
    if (/^[A-Za-zА-Яа-я\s]*$/.test(trimmedValue)) {
      setName(trimmedValue);
      setNameError("");
    } else {
      setNameError("Пожалуйста, используйте только буквы");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      // Блокируем пробел, если он первый символ
      const currentValue = e.currentTarget.value;
      if (currentValue.length === 0) {
        e.preventDefault();
      }
    }
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
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            required
          />
          {nameError && <p className={styles.error}>{nameError}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="phone">Телефон:</label>
          <InputMask
            id="phone"
            mask="+7 (999) 999-99-99"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
          {phoneError && <p className={styles.error}>{phoneError}</p>}
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
