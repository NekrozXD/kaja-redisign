import React from 'react';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl, Input } from '@mui/material';

export const EmployeeMuiDialog = ({ open, setOpen, isEditing, editEmployee, newEmployee, setNewEmployee, editedEmployee, setEditedEmployee, createEmployee, updateEmployee, departments, societies, workhours }) => {
    const [image, setImage] = useState('')
    const handleLogoChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{isEditing ? 'Edit Employee' : 'Create Employee'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    value={isEditing ? editedEmployee.name : newEmployee.name}
                    onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, name: e.target.value }) : setNewEmployee({ ...newEmployee, name: e.target.value }))}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="First Name"
                    value={isEditing ? editedEmployee.firstname : newEmployee.firstname}
                    onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, firstname: e.target.value }) : setNewEmployee({ ...newEmployee, firstname: e.target.value }))}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Matricule"
                    value={isEditing ? editedEmployee.matricule : newEmployee.matricule}
                    onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, matricule: e.target.value }) : setNewEmployee({ ...newEmployee, matricule: e.target.value }))}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Department</InputLabel>
                    <Select
                        value={isEditing ? editedEmployee.id_departments : newEmployee.id_departments}
                        onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, id_departments: e.target.value }) : setNewEmployee({ ...newEmployee, id_departments: e.target.value }))}
                    >
                        <MenuItem value="">Select Department</MenuItem>
                        {departments.map((department) => (
                            <MenuItem key={department.id} value={department.id}>
                                {department.coded}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Society</InputLabel>
                    <Select
                        value={isEditing ? editedEmployee.id_societies : newEmployee.id_societies}
                        onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, id_societies: e.target.value }) : setNewEmployee({ ...newEmployee, id_societies: e.target.value }))}
                    >
                        <MenuItem value="">Select Society</MenuItem>
                        {societies?.map((society) => (
                            <MenuItem key={society.id} value={society.id}>
                                {society.company_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Workhour</InputLabel>
                    <Select
                        value={isEditing ? editedEmployee.id_work_hours : newEmployee.id_work_hours}
                        onChange={(e) => (isEditing ? setEditedEmployee({ ...editedEmployee, id_work_hours: e.target.value }) : setNewEmployee({ ...newEmployee, id_work_hours: e.target.value }))}
                    >
                        <MenuItem value="">Select Workhour</MenuItem>
                        {workhours.map((workhour) => (
                            <MenuItem key={workhour.id} value={workhour.id}>
                                {workhour.nom }
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl  fullWidth margin="normal">
                <Input type="file" margin="normal" onChange={handleLogoChange} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                {isEditing ? (
                    <Button onClick={updateEmployee}>Update</Button>
                ) : (
                    <Button onClick={createEmployee}>Create</Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

