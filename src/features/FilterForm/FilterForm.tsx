import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/entities/employee/model/employeeSlice";
import { RootState } from "@/app/store";
import styles from "./FilterForm.module.scss";

const FilterForm: React.FC = () => {
  const dispatch = useDispatch();
  const { role, isArchive, sortType, sortOrder } = useSelector(
    (state: RootState) => state.employees.filter
  );

  console.log(1, sortOrder);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ role: e.target.value }));
  };

  const handleArchiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ isArchive: e.target.checked }));
  };

  const handleSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ sortType: e.target.value as "name" | "birthday" }));
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ sortOrder: e.target.value as "asc" | "desc" }));
  };

  return (
    <form className={styles.filterForm}>
      <div className={styles.filterGroup}>
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
      </div>

      <div className={`${styles.filterGroup} ${styles.archiveGroup}`}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={isArchive}
            onChange={handleArchiveChange}
          />
          В архиве
        </label>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="sortType-select">Сортировать по:</label>
        <select
          id="sortType-select"
          value={sortType}
          onChange={handleSortTypeChange}
          className={styles.select}
        >
          <option value="name">Имя</option>
          <option value="birthday">Дата рождения</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="sortOrder-select">Порядок:</label>
        <select
          id="sortOrder-select"
          value={sortOrder}
          onChange={handleSortOrderChange}
          className={styles.select}
        >
          <option value="asc">Возрастание</option>
          <option value="desc">Убывание</option>
        </select>
      </div>
    </form>
  );
};

export default FilterForm;
