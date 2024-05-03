import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeFilter = () => {
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/departments')
            .then(response => {
                setDepartments(response.data.departments);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, []);

    const handleDepartmentChange = (event) => {
        setDepartmentId(event.target.value);
    };

    const handleFilterEmployees = () => {
        axios.post('http://localhost:8000/api/employees/filterByDepartment', { departmentId })
            .then(response => {
                setEmployees(response.data.employees);
            })
            .catch(error => {
                console.error('Error filtering employees:', error);
            });
    };

    return (
        <div>
            <label htmlFor="department">Select a department:</label>
            <select id="department" value={departmentId} onChange={handleDepartmentChange}>
                <option value="">Select</option>
                {departments.map(department => (
                    <option key={department.id} value={department.id}>{department.coded}</option>
                ))}
            </select>
            <button onClick={handleFilterEmployees}>Filter Employees</button>

            <h2>Employees:</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>{employee.firstname}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeFilter;
