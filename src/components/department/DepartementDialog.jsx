import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const DepartmentDialog = ({ open, handleClose, isEditing, editedDepartment, newDepartment, setEditedDepartment, setNewDepartment, societies, updateDepartment, createDepartment }) => (
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
);

export default DepartmentDialog;
