    import React, { useState, useEffect } from 'react';
    import { toast, ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import Swal from 'sweetalert2';
    import { EmployeeMuiDialog } from './EmployeeDialog';
    import axios from 'axios';
    import { fetchEmployees, fetchSocieties, fetchDepartments, fetchWorkhours } from './api.js';
    import { createEmployeeAction, updateEmployeeAction, deleteEmployeeAction } from './EmployeeAction.js';
    import EmployeeTable from './EmployeeTable';
    import CsvImport from './CsvImport.jsx';

    import './Employee.scss';

    export const EmployeeComponent = () => {
        const [societies, setSocieties] = useState([]);
        const [departments, setDepartments] = useState([]);
        const [workhours, setWorkhours] = useState([]);
        const [employees, setEmployees] = useState([]);
        const [isEditing, setIsEditing] = useState(null);   
        const [open, setOpen] = useState(false);
        const [image, setImage] = useState();
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
            const workhours = await fetchWorkhours();
    
            setEmployees(employees);
            setSocieties(societies);
            setDepartments(departments);
            setWorkhours(workhours);
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
        
            console.log('deleteSelectedEmployees: ', selectedEmployees)

            Swal.fire({
                title: 'Are you sure?',
                text: 'This action is irreversible!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete them!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
            }).then(async (result) => {
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

        
        const handleClickWorkhour = async (workhourId, workhourName, totalHours, employeeName, employeeFirstName) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/workhourlines/${workhourId}`);
                showWorkhourLinesModal(response.data.workhourlines, workhourName, totalHours, employeeName, employeeFirstName);
            } catch (error) {
                console.error('Error fetching workhour lines:', error);
            }
        };

        const showWorkhourLinesModal = (workhourlines, workhourName, totalHours, employeeName, employeeFirstName) => {
            const tableRows = workhourlines
                .map(
                    (line) => `
                    <tr>
                        <td>${line.jour}</td>
                        <td>${line.checkin_am}</td>
                        <td>${line.checkout_am}</td>
                        <td>${line.checkin_pm}</td>
                        <td>${line.checkout_pm}</td>
                    </tr>
                `
                )
                .join('');

            Swal.fire({
                title: `Workhour Lines - ${workhourName} (${employeeName} ${employeeFirstName})`,
                html: `
                    <p>Total Hours: ${totalHours} hours</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Check-in AM</th>
                                <th>Check-out AM</th>
                                <th>Check-in PM</th>
                                <th>Check-out PM</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                `,
                confirmButtonText: 'OK',
                customClass: {
                    container: 'custom-swal-container',
                    popup: 'custom-swal-popup',
                    header: 'custom-swal-header',
                    title: 'custom-swal-title',
                    content: 'custom-swal-content',
                    closeButton: 'custom-swal-close-button',
                    icon: 'custom-swal-icon',
                    image: 'custom-swal-image',
                    input: 'custom-swal-input',
                    actions: 'custom-swal-actions',
                    confirmButton: 'custom-swal-confirm-button',
                    cancelButton: 'custom-swal-cancel-button',
                    footer: 'custom-swal-footer',
                },
                showConfirmButton: true,
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
                        <button onClick={toggleCsvImport}>Import CSV</button>
                        <button onClick={handleOpen}>Add Employee</button>
                    </header>
                        <EmployeeTable
                            employees={employees}
                            selectedEmployees={selectedEmployees}
                            handleClickWorkhour={handleClickWorkhour}
                            editEmployee={editEmployee}
                            deleteEmployee={deleteEmployee}
                            open={handleOpen}
                            deleteSelectedEmployees={deleteSelectedEmployees}
                            toggleEmployeeSelection={toggleEmployeeSelection}
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
                    workhours={workhours}
                />
                    </div>
                    <div>
                 
                   
                </div>
                
                    <ToastContainer />
                </div>
        );
    };
