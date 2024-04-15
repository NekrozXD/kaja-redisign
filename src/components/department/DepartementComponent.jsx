import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './departement.scss'

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
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/departments");
            setDepartments(response.data.departments);
        } catch (error) {
            console.error("Failed to fetch departments:", error);
        }
    };

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

    const createDepartment = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/departments", newDepartment);
            setDepartments([...departments, response.data.department]);
            setNewDepartment({
                coded: "",
                description: "",
                id_societies: "",
            });
            fetchDepartments();
            fetchSocieties();
            toast.success('Department created successfully');
            handleClose();
        } catch (error) {
            console.error("Failed to create department:", error);
        }
    };

    const updateDepartment = async () => {
        try {
            await axios.put(`http://localhost:8000/api/departments/${isEditing}`, editedDepartment);
            setDepartments(departments.map((department) => (department.id === isEditing ? editedDepartment : department)));
            setIsEditing(null);
            setEditedDepartment({
                coded: "",
                description: "",
                id_societies: "",
            });
            toast.info('Department updated successfully');
            fetchDepartments();
            fetchSocieties();
            handleClose();
        } catch (error) {
            console.error("Failed to update department:", error);
        }
    };
    return (
        <div className='departement' style={{backgroundColor:'var(--secondary-color)', padding:'15px', maxHeight:'90vh', minHeight:'90vh', width:'100%'}}>
        <Row>
            <Col>
                <Container>
                  
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{isEditing ? 'Edit Department' : 'Add Department'}</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                label="Coded"
                                fullWidth
                                value={isEditing ? editedDepartment.coded : newDepartment.coded}
                                onChange={(e) => (isEditing ? setEditedDepartment({ ...editedDepartment, coded: e.target.value }) : setNewDepartment({ ...newDepartment, coded: e.target.value }))}
                            />
                            <TextField
                                margin="dense"
                                label="Description"
                                fullWidth
                                value={isEditing ? editedDepartment.description : newDepartment.description}
                                onChange={(e) => (isEditing ? setEditedDepartment({ ...editedDepartment, description: e.target.value }) : setNewDepartment({ ...newDepartment, description: e.target.value }))}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="societies-label">Society</InputLabel>
                                <Select
                                    labelId="societies-label"
                                    value={isEditing ? editedDepartment.id_societies : newDepartment.id_societies}
                                    onChange={(e) => (isEditing ? setEditedDepartment({ ...editedDepartment, id_societies: e.target.value }) : setNewDepartment({ ...newDepartment, id_societies: e.target.value }))}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {societies.map((society) => (
                                        <MenuItem key={society.id} value={society.id}>{society.company_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button style={{padding:'10px', backgroundColor:'#dccf7e', color:'white' ,borderRadius:'4px'}} onClick={handleClose}>Cancel</Button>
                            {isEditing ? (
                                <Button style={{padding:'10px', backgroundColor:'var(--blue-color)', color:'white', borderRadius:'4px'}} onClick={updateDepartment}>Update</Button>
                            ) : (
                                <Button  style={{padding:'10px', backgroundColor:'var(--blue-color)', color:'white' ,borderRadius:'4px'}}  onClick={createDepartment}>Create</Button>
                            )}
                        </DialogActions>
                    </Dialog>
                </Container>
            </Col>
            <Col md={7} className="bg-transparent">
                <div className='department-table bg-transparent' style={{backgroundColor:'transparent',border:'none'}}>
                <div>
  <header style={{backgroundColor:'var(--thead-bg-color)', padding: '10px', textAlign: 'center', color: 'white', fontWeight: 'bolder', display:'flex' , textAlign:'center', justifyContent:'center', alignItems:'center', color:'var(--base-text-color)'}}>
    <p style={{padding:'15px', backgroundColor:'var(--primary-color)', color:'white', borderRadius:'4px', width:'80%'}}>Department list</p>
    <Button variant="contained" color="primary" style={{justifyContent:'flex-end', alignItems:'flex-end', marginLeft:'auto', padding:'15px', backgroundColor:'var(--blue-color)', color:'white', borderRadius:'4px'}} onClick={handleOpen}>
      Add Department
    </Button>
  </header>
  <table className='departement-table' style={{ width: '100%', backgroundColor: 'transparent' }}>
    {/* Table content goes here */}
  </table>
</div>
<table className='departement-table'    style={{ width: "100%", backgroundColor: "transparent", 
 }}>
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
                </div>
            </Col>
            <ToastContainer />
        </Row>
        </div>

    );
};  
