import { Employee, setFilter } from "@/entities/employee/model/employeeSlice";
import EmployeeCard from "@/entities/employee/ui/EmployeeCard";
import styles from "./EmployeeList.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployeeState } from "@/entities/employee/model/selectors";

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList = ({ employees }: EmployeeListProps) => {
  const {
    filter: { perPage = 5, currentPage = 1 },
  } = useSelector(selectEmployeeState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPages = Math.ceil(employees.length / perPage);

  const getCurrentPageEmployees = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return employees.slice(startIndex, endIndex);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setFilter({ currentPage: currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setFilter({ currentPage: currentPage + 1 }));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setFilter({ currentPage: page }));
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setFilter({ currentPage: 1, perPage: Number(e.target.value) }));
  };

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const range = 2;
    const startPage = Math.max(1, currentPage - range);
    const endPage = Math.min(totalPages, currentPage + range);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.wrap}>
      <button onClick={() => navigate("/new")} className={styles.addButton}>
        Добавить сотрудника
      </button>
      <section className={styles.list}>
        {getCurrentPageEmployees().length > 0 ? (
          getCurrentPageEmployees().map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))
        ) : (
          <p>Нет сотрудников для отображения.</p>
        )}
      </section>
      <div className={styles.paginationWrap}>
        <div className={styles.pagination}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Назад
          </button>
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`${styles.pageButton} ${
                currentPage === pageNumber ? styles.activePage : ""
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            Вперёд
          </button>
        </div>
        <div className={styles.itemsPerPage}>
          <label htmlFor="itemsPerPage">Элементов на странице:</label>
          <select
            id="itemsPerPage"
            value={perPage}
            onChange={handleItemsPerPageChange}
            className={styles.select}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
