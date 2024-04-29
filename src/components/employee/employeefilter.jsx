import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeFilter = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/departments')
            .then(response => {
                console.log(response.data);
                setDepartments(response.data.departments);
                console.log(departments);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, []);
    
    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
        filterEmployees(event.target.value);
    };
    const filterEmployees = (departmentId) => {
        axios.post('http://localhost:8000/api/filter_department', {
            department: departmentId,
        })
            .then(response => {
                console.log(response.data);
                const filteredEmployees = response.data.attendance;
                const presentEmployees = filteredEmployees.filter(employee => employee.presence);
                const absentEmployees = filteredEmployees.filter(employee => !employee.presence);
                console.log('Present employees:', presentEmployees.length);
                console.log('Absent employees:', absentEmployees.length);
                setEmployees(filteredEmployees);
            })
            .catch(error => {
                console.error('Error filtering employees:', error);
            });
    };
    

    return (
        <div>
            <select value={selectedDepartment} onChange={handleDepartmentChange}>
                <option value="">Select a department</option>
                {departments.length > 0 && departments.map(department => (
                    <option key={department.id} value={department.id}>{department.coded}</option>
                ))}
            </select>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>employee</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="3">Loading...</td>
                        </tr>
                    ) : (
                        employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.id_employe}</td>
                                <td>{employee.employee}</td>
                                <td>{employee.presence ? 'present' : 'absent'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            Present Employees: {employees.filter(employee => employee.presence).length}<br />
                            Absent Employees: {employees.filter(employee => !employee.presence).length}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
    }

export default EmployeeFilter;
