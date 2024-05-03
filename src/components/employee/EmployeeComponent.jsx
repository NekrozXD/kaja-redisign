    import React, { useState, useEffect } from 'react';
    import { toast, ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import Swal from 'sweetalert2';
    import { EmployeeMuiDialog } from './EmployeeDialog';
    import axios from 'axios';
    import { fetchEmployees, fetchSocieties, fetchDepartments, fetchWorkhours } from './api.js';
    import { createEmployeeAction, updateEmployeeAction, deleteEmployeeAction } from './EmployeeAction.js';
    import EmployeeTable from './EmployeeTable';
    import {CsvImport} from './CsvImport.jsx';
    import {WorkhourLinesModal} from './WorkhourLinesModal';
    import {showDeleteConfirmation, deleteSelectedEmployees} from './SwalMessage.js'
    import './Employee.scss';
    import styled from 'styled-components';

    

        const StyledSelect = styled.select`
            padding: 5px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
            width: 200px; 
        `;

        const StyledOption = styled.option`
        font-size: 16px;
        font-family: 'Roboto', sans-serif; 
        font-weight: bold;
    `;

    const MoreOptionsModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
    export const EmployeeComponent = () => {
        const [societies, setSocieties] = useState([]); 
        const [departments, setDepartments] = useState([]);
        const [workhours, setWorkhours] = useState([]);
        console.log(workhours)
        const [employees, setEmployees] = useState([]);
        const [isEditing, setIsEditing] = useState(null);   
        const [open, setOpen] = useState(false);
        const [image, setImage] = useState();
        const [showWorkhourModal, setShowWorkhourModal] = useState(false);
        const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

        const filterByDepartment = async (departmentId) => {
            try {
                let response;
                if (departmentId === '') {
                    response = await axios.get('http://localhost:8000/api/employees');
                } else {
                    response = await axios.post('http://localhost:8000/api/employees/filterByDepartment', { departmentId });
                }
                setEmployees(response.data.employees);
            } catch (error) {
                console.error('Failed to filter employees by department:', error);
            }
        };

        const [selectedFilters, setSelectedFilters] = useState({
            department: '',
            workhour: '',
            society: ''
          });

          const filterEmployees = async () => {
            try {
                let response;
                const { department, workhour, society } = selectedFilters;
                if (department && !workhour && !society) {
                    response = await axios.post('http://localhost:8000/api/employees/filterByDepartment', { departmentId: department });
                } else if (workhour && !department && !society) {
                    response = await axios.post('http://localhost:8000/api/employees/filterByWorkhour', { workhourId: workhour });
                } else if (society && !department && !workhour) {
                    response = await axios.post('http://localhost:8000/api/employees/filterBySociety', { societyId: society });
                } else if (department && workhour && !society) {
                    response = await axios.post('http://localhost:8000/api/employees/filterByDepartmentWorkhour', { departmentId: department, workhourId: workhour });
                } else if (department && society && !workhour) {
                    response = await axios.post('http://localhost:8000/api/employees/filterByDepartmentSociety', { departmentId: department, societyId: society });
                } else if (workhour && society && !department) {
                    response = await axios.post('http://localhost:8000/api/employees/filterByWorkhourSociety', { workhourId: workhour, societyId: society });
                } else if (department && workhour && society) {
                    response = await axios.post('http://localhost:8000/api/employees/filterByWorkhourSocietyDepartment', { departmentId: department, workhourId: workhour, societyId: society });
                } else {
                    response = await axios.get('http://localhost:8000/api/employees');
                }
                setEmployees(response.data.employees);
            } catch (error) {
                console.error('Failed to filter employees:', error);
            }
        };
        

    const [selectedWorkhour, setSelectedWorkhour] = useState(null);

    const handleClickWorkhour = async (workhourId, workhourName, totalHours, employeeName, employeeFirstName) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/workhourlines/${workhourId}`);
            setSelectedWorkhour({
                workhourlines: response.data.workhourlines,
                workhourName,
                totalHours,
                employeeName,
                employeeFirstName
            });
            setShowWorkhourModal(true);
        } catch (error) {
            console.error('Error fetching workhour lines:', error);
        }
    };

    const handleCloseWorkhourModal = () => {
        setShowWorkhourModal(false);
        setSelectedWorkhour(null);
    };
        const [newEmployee, setNewEmployee] = useState({
            name: '',
            firstname: '',
            id_departments: '',
            matricule:'',
            id_societies: '',
            id_work_hours: '',
            image:''
        });
        const [editedEmployee, setEditedEmployee] = useState({
            name: '',
            firstname: '',
            id_departments: '',
            matricule:'',
            id_societies: '',
            id_work_hours: '',
            image:''
        });
        const [selectedEmployees, setSelectedEmployees] = useState([]);

        const fetchData = async () => {
            const employees = await fetchEmployees();
            const societies = await fetchSocieties();
            const departments = await fetchDepartments();
            const workhoursData = await fetchWorkhours();

            setEmployees(employees);
            setSocieties(societies);
            setDepartments(departments);
            setWorkhours(workhoursData);
            console.log('workhours: ', workhours);
        };
    
        useEffect(() => {
            fetchData();
        }, []);

        const handleOpen = () => {
            setOpen(true);
        };

        const createEmployee = async () => {
            try {
                console.log(newEmployee)
                // const {...employeeData } = newEmployee;
                await createEmployeeAction(newEmployee);
                setOpen(false);
                fetchData();
            } catch (error) {
                console.error('Failed to create employee:', error);
            }
        };
        

        const updateEmployee = async () => {
            try {
                await updateEmployeeAction(isEditing, editedEmployee);
                fetchEmployees();
                setIsEditing(null);
                setOpen(false)
                fetchData()
                setEditedEmployee({
                    name: '',
                    firstname: '',
                    id_departments: '',
                    matricule:'',
                    id_societies: '',
                    id_work_hours: '',
                    image
                });
            
            } catch (error) {
                console.error('Failed to update employee:', error);
            }
        };

        const deleteEmployee = async (id) => {
            try {
                await axios.delete(`http://localhost:8000/api/employees/${id}`, { data: { ids: [id] } });
                setEmployees(employees.filter((employee) => employee.id !== id));
                Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
            } catch (error) {
                console.error('Failed to delete employee:', error);
                Swal.fire('Error!', 'Failed to delete employee.', 'error');
            }
        };
        

        const toggleEmployeeSelection = (id) => {
            if (selectedEmployees.includes(id)) {
                setSelectedEmployees(selectedEmployees.filter((employeeId) => employeeId !== id));
            } else {
                setSelectedEmployees([...selectedEmployees, id]);
            }
        };

        const deleteSelectedEmployees = async () => {
            showDeleteConfirmation().then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await Promise.all(selectedEmployees.map((id) => deleteEmployeeAction(id)));
                        setEmployees(employees.filter((employee) => !selectedEmployees.includes(employee.id)));
                        setSelectedEmployees([]);
                        Swal.fire('Deleted!', 'Employees have been deleted.', 'success');
                    } catch (error) {
                        console.error('Failed to delete employees:', error);
                        Swal.fire('Error!', 'Failed to delete employees.', 'error');
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Cancelled', 'Employee deletion has been cancelled.', 'error');
                }
            });
        };
        
        const editEmployee = (employee) => {
            setIsEditing(employee.id);
            setOpen(true)
            setEditedEmployee({
                name: employee.name,
                firstname: employee.firstname,
                matricule: employee.matricule,
                id_departments: employee.id_departments,
                id_societies: employee.id_societies,
                id_work_hours: employee.id_work_hours,
                image:employee.image
            });
        };
        const [showCsvImport, setShowCsvImport] = useState(false);

        const toggleCsvImport = () => {
            setShowCsvImport(!showCsvImport);
        };

        
        return (
                <div className='employee'>
                    
                    {showCsvImport && (
                    <CsvImport
                        employees={employees}
                        departments={departments}
                        societies={societies}
                        workhours={workhours}
                        updateEmployeeAction={updateEmployeeAction}
                        fetchData={fetchData}
                        toast={toast}
                        onImportComplete={() => setShowCsvImport(false)} 
                    />
                )}
                {!showCsvImport && (
                    
                    <div>
                        <header style={{background:'var(--thead-bg-color)',padding: '10px', textAlign: 'center', color: 'white', fontWeight: 'bolder', display:'flex' , textAlign:'center', justifyContent:'center', alignItems:'center', color:'var(--base-text-color)'}}>
                    <p style={{  padding:'15px', backgroundColor:'var(--primary-color)',color:'white', borderRadius:'4px', width:'80%'}} >Employee list</p> 
                 <div>
                    <label htmlFor="department">Select a department:</label>
                    <select id="department" onChange={(e) => {
                        console.log("Selected department ID:", e.target.value);
                        setSelectedFilters({...selectedFilters, department: e.target.value});
                    }}>
                        <option value="">All Departments</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>{department.coded}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="workhour">Select a workhour:</label>
                    <select id="workhour" onChange={(e) => {
                        console.log("Selected workhour ID:", e.target.value);
                        setSelectedFilters({...selectedFilters, workhour_id: e.target.value});
                    }}>
                        <option value="">All Workhours</option>
                        {workhours && workhours.workhours && workhours.workhours.map((workhour) => (
                            <option key={workhour.id} value={workhour.id}>{workhour.nom}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="society">Select a society:</label>
                    <select id="society" onChange={(e) => {
                        console.log("Selected society ID:", e.target.value);
                        setSelectedFilters({...selectedFilters, society_id: e.target.value});

                    }}>
                        <option value="">All Societies</option>
                        {societies.map((society) => (
                            <option key={society.id} value={society.id}>{society.company_name}</option>
                        ))}
                    </select>
                </div>
                <button onClick={filterEmployees}>Filter Employees</button>

                        <button onClick={toggleCsvImport}>Import CSV</button>
                        <button onClick={handleOpen}>Add Employee</button>
                    </header>
                    <EmployeeTable
                        employees={employees}
                        selectedEmployees={selectedEmployees}
                        handleClickWorkhour={handleClickWorkhour}
                        editEmployee={editEmployee}
                        deleteEmployee={deleteEmployee}
                        filterByDepartment={filterByDepartment}
                        departments={departments}
                        selectedDepartmentId={selectedDepartmentId}
                    />
                    </div>
                )}
                    <div md={5}>
                    <EmployeeMuiDialog
                    open={open}
                    setOpen={setOpen}
                    isEditing={isEditing}
                    editEmployee={editEmployee}
                    newEmployee={newEmployee}
                    setNewEmployee={setNewEmployee}
                    editedEmployee={editedEmployee}
                    setEditedEmployee={setEditedEmployee}
                    createEmployee={createEmployee}
                    updateEmployee={updateEmployee}
                    departments={departments}
                    societies={societies}
                    employees={employees}
                    workhours={workhours}
                />
                    </div>
                    <div>
                 
                   
                </div>
                <WorkhourLinesModal
                show={showWorkhourModal}
                handleClose={handleCloseWorkhourModal}
                {...selectedWorkhour}
            />
                    <ToastContainer />
                </div>
        );
    };
