import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import Swal from 'sweetalert2';
import { useRef } from 'react';

const AreaCards = ({ selectedDepartment }) => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const filterEmployees = (departmentId) => {
    let apiUrl = 'http://localhost:8000/api/liste';
  
    if (departmentId && departmentId !== 'all') {
      apiUrl = 'http://localhost:8000/api/filter_department';
    }
  
    let requestData = {};
    if (departmentId && departmentId !== 'all') {
      requestData = { department: departmentId };
    }
  
    axios({
      method: departmentId && departmentId !== 'all' ? 'POST' : 'GET',
      url: apiUrl,
      data: requestData,
      params: departmentId && departmentId !== 'all' ? null : { department: departmentId }
    })
    .then(response => {
      setEmployees(response.data.attendance);
      console.log(employees);
    })
    .catch(error => {
      console.error('Error filtering employees:', error);
    });
  };
  

  useEffect(() => {
    if (selectedDepartment) {
      filterEmployees(selectedDepartment);
    }
  }, [selectedDepartment]);

  const showEmployee = (employees) => {
    const tableRows = employees.map(
      (employee) => `
        <tr>
          <td>${employee.id_employe}</td>
          <td>${employee.employee}</td>
          <td>${employee.department}</td>
        </tr>
      `
    ).join('');
    
    Swal.fire({
      title: 'Employees',
      html: `
        <table id="employeesTable">
          <thead>
            <tr>  
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>`,
      icon: 'info',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      didOpen: () => {
        const table = document.getElementById('employeesTable');
        if (table) {
          table.style.width = '100%';
          table.style.textAlign = 'center';
          table.style.borderCollapse = 'collapse';
        }
    
        const thTdStyles = 'border: 1px solid grey; padding: 8px;';
        const ths = table.querySelectorAll('th');
        ths.forEach((th) => {
          th.style.cssText = thTdStyles;
        });
    
        const tds = table.querySelectorAll('td');
        tds.forEach((td) => {
          td.style.cssText = thTdStyles;
        });
      },
    });
    
  }

  if (!employees) {
    return <div>Loading...</div>;
  }

  const totalEmployees = employees.length;
  const presentEmployees = employees.filter(employee => employee.presence);
  const absentEmployees = employees.filter(employee => !employee.presence);
  const lateEmployees = employees.filter(employee => employee.late).length;

  const presentPercentage = totalEmployees > 0 ? ((presentEmployees.length / totalEmployees) * 100).toFixed(2) : 0;
  const absentPercentage = totalEmployees > 0 ? ((absentEmployees.length / totalEmployees) * 100).toFixed(2) : 0;
  const latePercentage = totalEmployees > 0 ? ((lateEmployees / totalEmployees) * 100).toFixed(2) : 0;

  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "purple"]}
        cardInfo={{
          title: "Total",
          value: totalEmployees,
          text: "total number of employees",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={presentPercentage}
        cardInfo={{
          title: "Present",
          value: presentEmployees.length,
          text: "Present employee",
        }}
        hoverContent={'show'}
        onClick={() => showEmployee(presentEmployees)}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={absentPercentage}
        cardInfo={{
          title: "Absent",
          value: absentEmployees.length,
          text: "Absent employee",
        }}
        hoverContent={'show'}
        onClick={() => showEmployee(absentEmployees)}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={latePercentage}
        cardInfo={{
          title: "Late",
          value: lateEmployees,
          text: "Late employee",
        }}
      />
    </section>
  );
};

export default AreaCards;