    import React from 'react';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { useState } from 'react';
    import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
    import './departement.scss'

    const DepartmentTable = ({ departments, editDepartment, deleteDepartment }) => {

        const [selectedDepartments, setSelectedDepartments] = useState([]);

        const toggleDepartmentSelection = (id) => {
            setSelectedDepartments((prevSelectedDepartments) => {
                if (prevSelectedDepartments.includes(id)) {
                    return prevSelectedDepartments.filter((selectedId) => selectedId !== id);
                } else {
                    return [...prevSelectedDepartments, id];
                }
            });
        };

        const deleteSelectedDepartments = () => {
            selectedDepartments.forEach((id) => {
                deleteDepartment(id);
            });
            setSelectedDepartments([]);
        };

        return (
            <div className="departmentTable">
                {selectedDepartments.length > 0 && (
                    <button className='delete' onClick={deleteSelectedDepartments}>
                        Delete selected
                    </button>
                )}
                <table className="table" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Coded</th>
                            <th>Description</th>
                            <th>Society</th>
                            <th>Employees numbers</th>
                            <th>Society logo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department) => (
                            <tr key={department.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedDepartments.includes(department.id)}
                                        onChange={() => toggleDepartmentSelection(department.id)}
                                    />
                                </td>
                                <td>{department.coded}</td>
                                <td>{department.description}</td>
                                <td>{department.society?.company_name}</td>
                                <td>150</td>
                                <td width={'100px'}>
                                    <img
                                        width="50px"
                                        src={`http://localhost:8000/storage/society/logo/${department.society?.logo}`}
                                        alt="Society Logo"
                                    />
                                </td>
                                <td width={'150px'}>
                                    <button className="edit" onClick={() => editDepartment(department)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="delete" onClick={() => deleteDepartment(department.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            
            </div>
        );
    };

    export default DepartmentTable;