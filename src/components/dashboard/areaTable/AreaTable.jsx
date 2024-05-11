import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './AreaTable.scss';

const AreaTable = () => {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    const fetchTodayAttendanceData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/filter_date', {
          date_debut: new Date().toISOString().split('T')[0],
          date_fin: new Date().toISOString().split('T')[0],
        });
        setAttendanceData(response.data.attendance);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        // Handle error
      }
    };

    fetchTodayAttendanceData();
  }, []);


  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Attendance</h4>
      </div>
      <div className="data-table-diagram">
        {attendanceData && (
          <table>
            <thead style={{textAlign:'center'}}>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Presence</th>
                <th>Retard</th>
                <th>Value Retard</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendance) => (
                <tr key={attendance.id_employee}>
                  <td>{attendance.id_employee}</td>
                  <td>{attendance.employee}</td>
                  <td>{attendance.department}</td>
                  <td>{attendance.presence ? 'Present' : 'Absent'}</td>
                  <td>{attendance.retard ? 'Yes' : 'No'}</td>
                  <td>{attendance.value_retard}</td>
                  <td>{attendance.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AreaTable;
