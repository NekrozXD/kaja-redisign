// DepartmentComponent.js

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './departement.scss'
import axios from 'axios';
import DepartmentTable from './DepartementTable';
import DepartmentDialog from './DepartementDialog';
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from './DepartmentAction';

export const DepartmentComponent = () => {
    const [societies, setSocieties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [open, setOpen] = useState(false)
    const [newDepartment, setNewDepartment] = useState({
        coded: "",
        description: "",
        id_societies: "",
    });
    const [editedDepartment, setEditedDepartment] = useState({
        coded: "",
        description: "",
        id_societies: "",
    });

    const editDepartment = (department) => {
        setIsEditing(department.id);
        setOpen(true);
        fetchSocieties();
        fetchDepartments();
        setEditedDepartment({
            coded: department.coded,
            description: department.description,
            id_societies: department.id_societies,
        });
    };

    useEffect(() => {
        fetchDepartments().then((data) => setDepartments(data)).catch((error) => console.error('Failed to fetch departments:', error));
    }, []);

    const fetchSocieties = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/societies");
            setSocieties(response.data); 
        } catch (error) {
            console.error("Error fetching societies:", error);
        }
    };
    
    useEffect(() => {
        fetchSocieties();
    }, []);
    

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsEditing(null);
        setEditedDepartment({
            coded: "",
            description: "",
            id_societies: "",
        });
        setNewDepartment({
            coded: "",
            description: "",
            id_societies: "",
        });
    };

    const handleCreate = async () => {
        try {
            const createdDepartment = await createDepartment(newDepartment);
            fetchSocieties();
            console.log(societies)
            setDepartments([...departments, createdDepartment]);
            setNewDepartment({
                coded: "",
                description: "",
                id_societies: "",
            });
            
            toast.success('Department created successfully');
            handleClose();
        } catch (error) {
            console.error("Failed to create department:", error);
        }
    };
    const [, forceUpdate] = React.useState();

    const handleUpdate = async () => {
        console.log('updating department')
        try {
            await updateDepartment(isEditing, editedDepartment);
            fetchDepartments();
            fetchSocieties();
            console.log(societies)
            setDepartments(departments.map((department) => (department.id === isEditing ? editedDepartment : department)));
            setIsEditing(null);
            setEditedDepartment({
                coded: "",
                description: "",
                id_societies: "",
            });
            window.location.reload();
            toast.info('Department updated successfully');
            
            handleClose();
            forceUpdate(); // Add a forceUpdate call to force a re-render
        } catch (error) {
            console.error("Failed to update department:", error);
        }
    };
    
    
    
    const handleDeleteDepartment = async (id) => {
        console.log("Deleting department with ID:", id);
        try {
            await deleteDepartment(id);
            setDepartments(departments.filter((department) => department.id !== id));
        } catch (error) {
            console.error("Failed to delete department:", error);
        }
    };

    return (
        <div className='departement' style={{backgroundColor:'var(--secondary-color)', padding:'15px', maxHeight:'90vh', minHeight:'90vh', width:'100%'}}>
        <Row>
            <Col>
                <Container>
                    <DepartmentDialog
                        open={open}
                        handleClose={handleClose}
                        isEditing={isEditing}
                        editedDepartment={editedDepartment}
                        newDepartment={newDepartment}
                        setEditedDepartment={setEditedDepartment}
                        setNewDepartment={setNewDepartment}
                        societies={societies}
                        updateDepartment={handleUpdate}
                        createDepartment={handleCreate}
                    />
                </Container>
            </Col>
            <Col md={7} className="bg-transparent">
                <div className='department-table bg-transparent' style={{backgroundColor:'transparent',border:'none'}}>
                    <header style={{backgroundColor:'var(--thead-bg-color)', padding: '10px', textAlign: 'center', color: 'white', fontWeight: 'bolder', display:'flex' , textAlign:'center', justifyContent:'center', alignItems:'center', color:'var(--base-text-color)'}}>
                        <p style={{padding:'15px', backgroundColor:'var(--primary-color)', color:'white', borderRadius:'4px', width:'80%'}}>Department list</p>
                        <Button variant="contained" color="primary" style={{justifyContent:'flex-end', alignItems:'flex-end', marginLeft:'auto', padding:'15px', backgroundColor:'var(--blue-color)', color:'white', borderRadius:'4px'}} onClick={handleOpen}>
                            Add Department
                        </Button>
                    </header>
                    <DepartmentTable
                        departments={departments}
                        editDepartment={editDepartment}
                        deleteDepartment={handleDeleteDepartment}
                    />
                </div>
            </Col>
            <ToastContainer />
        </Row>
        </div>
    );
};  
