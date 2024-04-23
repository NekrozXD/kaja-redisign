import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import Swal from 'sweetalert2';
import { useRef } from 'react';

const AreaCards = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [showPresentList, setShowPresentList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/liste');
        setAttendanceData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
 
    return () => clearInterval(intervalId);
  }, []);

  if (!attendanceData) {
    return <div>Loading...</div>;
  }

  const totalEmployees = parseInt(attendanceData.employee_total);
  const presentEmployees = attendanceData.attendance.filter(employee => employee.presence);
  const absentEmployees = attendanceData.attendance.filter(employee => !employee.presence);
  const lateEmployees = parseInt(attendanceData.employee_retard);

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
        onClick={() => {
       
          Swal.fire({
            title: 'Present Employees',
            html: `<ul>${presentEmployees.map(employee => `<li>${employee.employee}</li>`).join('')}</ul>`,
            icon: 'info',
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
          });
        }}
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
  onClick={() => {
    console.log('Absent Employees:', absentEmployees);
    Swal.fire({
      title: 'Absent Employees',
      html: `<ul>${absentEmployees.map(employee => `<li>${employee.employee}</li>`).join('')}</ul>`,
      icon: 'info',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
    });
  }}
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
