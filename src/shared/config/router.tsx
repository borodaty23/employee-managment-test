import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeListPage from "@/pages/EmployeeListPage";
import EditEmployeePage from "@/pages/EditEmployeePage";
import NewEmployeePage from "@/pages/NewEmployeePage";
import Loader from "../components/Loader/Loader";
import NotFoundPage from "@/pages/NotFoundPage";

const AppRouter: React.FC = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<EmployeeListPage />} />
        <Route path="/edit/:id" element={<EditEmployeePage />} />
        <Route path="/new" element={<NewEmployeePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRouter;
