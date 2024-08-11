import React, { useState } from "react";
import { Employee } from "@/entities/employee/model/employeeSlice";
import EmployeeCard from "@/entities/employee/ui/EmployeeCard";
import styles from "./EmployeeList.module.scss";
import { useNavigate } from "react-router-dom";

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const getCurrentPageEmployees = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return employees.slice(startIndex, endIndex);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
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
            value={itemsPerPage}
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
