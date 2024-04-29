import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../components";
import { useState } from "react";

const Dashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartment(departmentId);
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
