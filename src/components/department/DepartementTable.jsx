import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const DepartmentTable = ({ departments, editDepartment, deleteDepartment }) => (
    <table className='departement-table' style={{ width: "100%", backgroundColor: "transparent" }}>
        <thead style={{ backgroundColor: 'var(--thead-bg-color)'}}>
            <tr>
                <th>Coded</th>
                <th>Description</th>
                <th>Society</th>
                <th>Society logo</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {departments.length === 0 ? (
                <tr>
                    <td colSpan="6" className="text-center">
                        <div className="dot-spinner">
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                            <div className="dot-spinner__dot"></div>
                        </div>
                    </td>
                </tr>
            ) : (
                departments.map((department) => (
                    <tr key={department.id}>
                        <td>{department.coded}</td>
                        <td>{department.description}</td>
                        <td>{department.society?.company_name}</td>
                        <td width={'100px'}><img width="50px" src={`http://localhost:8000/storage/society/logo/${department.society?.logo}`} alt="Society Logo" /></td>
                        <td width={'150px'}>
                            <button className="edit" onClick={() => editDepartment(department)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="delete" onClick={() => deleteDepartment(department.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <span>&nbsp;</span>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
);

export default DepartmentTable;
