import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IMask from "imask";
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
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const formatDateToInput = (dateString: string) => {
    const [day, month, year] = dateString.split(".").map(Number);
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  const parseDateFromInput = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return `${day.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year}`;
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = ("" + phone).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
    return phone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = e.target.value;
    setPhone(formattedPhone);
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
      setNameError("Имя не может быть пустым");
      return;
    }

    const newEmployee = {
      id: employeeId || Date.now(),
      name,
      phone,
      birthday: parseDateFromInput(birthdate),
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

  useEffect(() => {
    if (phoneInputRef.current) {
      const maskOptions = {
        mask: "+{7} (000) 000-00-00",
        lazy: false,
      };

      const mask = IMask(phoneInputRef.current, maskOptions);

      mask.on("accept", () => {
        setPhone(mask.value);
      });

      return () => {
        mask.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPhone(formatPhoneNumber(employee.phone));
      setBirthdate(formatDateToInput(employee.birthday));
      setRole(employee.role);
      setIsArchive(employee.isArchive);
    }
  }, [employee]);

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
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            ref={phoneInputRef}
            placeholder="+7 (___) ___-__-__"
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
