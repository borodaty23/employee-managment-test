import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeListPage from "@/pages/EmployeeListPage/EmployeeListPage";
import EditEmployeePage from "@/pages/EditEmployeePage/EditEmployeePage";
import NewEmployeePage from "@/pages/NewEmployeePage/NewEmployeePage";

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<EmployeeListPage />} />
      <Route path="/edit/:id" element={<EditEmployeePage />} />
      <Route path="/new" element={<NewEmployeePage />} />
    </Routes>
  </Router>
);

export default AppRouter;
