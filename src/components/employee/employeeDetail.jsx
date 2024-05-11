import React from 'react';

const EmployeeDetails = ({ location }) => {
  const employees = location?.state?.employees || [];
 console.log(employees);
  return (
    <div>
      <h1>Employee Details</h1>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id_employe}>
              <td>{employee.id_employe}</td>
              <td>{employee.employee}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
