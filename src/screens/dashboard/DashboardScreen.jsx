import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../components";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  useEffect(() => {
    const storedDepartment = localStorage.getItem("selectedDepartment");
    if (storedDepartment) {
      setSelectedDepartment(storedDepartment);
    }
  }, []);

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartment(departmentId);
    localStorage.setItem("selectedDepartment", departmentId);
  };

  const handleDateRangeSelect = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <div className="content-area">
      <AreaTop
        onDepartmentSelect={handleDepartmentSelect}
        onDateRangeSelect={handleDateRangeSelect}
      />
      <AreaCards
        selectedDepartment={selectedDepartment}
        selectedDateRange={selectedDateRange}
      />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
