import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Employee.scss';
import ReactPaginate from 'react-paginate';

const EmployeeTable = ({ employees, handleClickWorkhour, editEmployee, deleteEmployee,department }) => {
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;
    console.log(employees)

    const deleteSelectedEmployees = () => {
        if (selectedEmployees.length === 0) return;
        setSelectedEmployees([]);

        selectedEmployees.forEach((id) => {
            deleteEmployee(id);
        });
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const pageCount = Math.ceil(employees.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;

    return (
        <div className="employeeTable">
            {selectedEmployees.length > 0 && (
                <Button variant="danger" onClick={deleteSelectedEmployees} className="ml-2">
                    Delete selected
                </Button>
            )}
            <table className="table" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Firstname</th>
                        <th>Workhour</th>
                        <th>Society name</th>
                        <th>Matricule</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.slice(offset, offset + itemsPerPage).map((employee) => (
                        <tr key={employee.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedEmployees.includes(employee.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedEmployees([...selectedEmployees, employee.id]);
                                        } else {
                                            setSelectedEmployees(selectedEmployees.filter((id) => id !== employee.id));
                                        }
                                    }}
                                />
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.firstname}</td>
                            <td>
                                <p
                                    onClick={() =>
                                        handleClickWorkhour(
                                            employee.workhour?.id,
                                            employee.workhour?.nom,
                                            employee.workhour?.total_hour,
                                            employee.name,
                                            employee.firstname
                                        )
                                    }
                                    className="workhour-emp clickable"
                                >
                                    {employee.workhour?.nom}
                                </p>
                            </td>
                            <td>{employee.society?.company_name}</td>
                            <td>
                               {employee.matricule}
                            </td>
                            <td>{employee.department?.description}</td>
                            <td>
                                <button className="edit" onClick={() => editEmployee(employee)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="delete" onClick={() => deleteEmployee(employee.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{width:'100%', display:'flex', alignContent:'center', justifyContent:'center',padding:'5px'}}>
            <ReactPaginate
                previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
                nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={12}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
            </div>
            
        </div>
    );
};

export default EmployeeTable;
