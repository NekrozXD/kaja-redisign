import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  margin-bottom: 20px;
  display:flex;
  flex-direction: row;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 200px;
  padding: 8px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding:  15px;
  background-color: var(--blue-color);
  color: white;
  border-radius:4px;
  border: none;
  cursor: pointer;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  color:var(--base-text-color)
`;

const Th = styled.th`
  background-color: var(--thead-bg-color);
  color: var(--base-text-color);
  padding: 10px;
  text-align: left;
  height:50px;
`;

const Td = styled.td`
  border: none;
  padding: 10px;
  height:50px;
`;


const AttendanceComponent = () => {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);

  const handleDateDebutChange = (e) => {
    setDateDebut(e.target.value);
  };

  const handleDateFinChange = (e) => {
    setDateFin(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/filter_date', {
        date_debut: dateDebut,
        date_fin: dateFin,
      });
      setAttendanceData(response.data.attendance);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      // Handle error
    }
  };

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
    <div style={{background:'var(--secondary-color)', padding:'15px', color:'var(--base-text-color)', maxHeight:'90vh', minHeight:'90vh', overflowY:'auto'}}>
      <Form onSubmit={handleSubmit}>
        <Label>
          Date Debut:
          <Input type="date" value={dateDebut} onChange={handleDateDebutChange} />
        </Label>
        <Label>
          Date Fin:
          <Input type="date" value={dateFin} onChange={handleDateFinChange} />
        </Label>
        <Button type="submit">Fetch Attendance Data</Button>
      </Form>
      {attendanceData && (
        <StyledTable>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Employee</Th>
              <Th>Department</Th>
              <Th>Presence</Th>
              <Th>Retard</Th>
              <Th>Value Retard</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance) => (
              <tr key={attendance.id_employee}>
                <Td>{attendance.id_employee}</Td>
                <Td>{attendance.employee}</Td>
                <Td>{attendance.department}</Td>
                <Td>{attendance.presence ? 'Present' : 'Absent'}</Td>
                <Td>{attendance.retard ? 'Yes' : 'No'}</Td>
                <Td>{attendance.value_retard}</Td>
                <Td>{attendance.date}</Td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </div>
  );
};  

export default AttendanceComponent;
