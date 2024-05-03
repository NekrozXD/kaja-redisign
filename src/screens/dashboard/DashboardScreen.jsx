import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../components";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Load selected department from localStorage on component mount
  useEffect(() => {
    const storedDepartment = localStorage.getItem('selectedDepartment');
    if (storedDepartment) {
      setSelectedDepartment(storedDepartment);
    }
  }, []);

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartment(departmentId);
    // Save selected department to localStorage
    localStorage.setItem('selectedDepartment', departmentId);
  };

  return (
    <div className="content-area">
      <AreaTop onDepartmentSelect={handleDepartmentSelect} />
      <AreaCards selectedDepartment={selectedDepartment} />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
