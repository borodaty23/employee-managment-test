import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "@/entities/employee/model/employeeSlice";
import styles from "./FilterForm.module.scss";

const FilterForm: React.FC = () => {
  const [role, setRole] = useState<string>("");
  const [isArchive, setIsArchive] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    dispatch(setFilter({ role: e.target.value, isArchive }));
  };

  const handleArchiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsArchive(e.target.checked);
    dispatch(setFilter({ role, isArchive: e.target.checked }));
  };

  return (
    <form className={styles.filterForm}>
      <label htmlFor="role-select">Должность:</label>
      <select
        id="role-select"
        value={role}
        onChange={handleRoleChange}
        className={styles.select}
      >
        <option value="">Все должности</option>
        <option value="cook">Повар</option>
        <option value="waiter">Официант</option>
        <option value="driver">Водитель</option>
      </select>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={isArchive}
          onChange={handleArchiveChange}
        />
        В архиве
      </label>
    </form>
  );
};

export default FilterForm;
