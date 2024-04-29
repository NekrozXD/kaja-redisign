// UserDialog.jsx

import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from "axios";

export const UserDialog = ({ open, onClose, userData, departments, employees, societies, onSubmit,onChange }) => {
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleChange = (e) => {
  onChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{userData.id ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField margin='dense' label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
        <TextField margin='dense' label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
        <TextField margin='dense' label="Password" type="password" name="password" value={formData.password} onChange={handleChange} fullWidth />
        <TextField margin='dense' label="Role" name="role" value={formData.role} onChange={handleChange} fullWidth />
        <FormControl fullWidth>
          <InputLabel>Employee</InputLabel>
          <Select name="id_employees" value={formData.id_employees} onChange={handleChange} fullWidth>
            <MenuItem value="">Select Employee</MenuItem>
            {employees.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>{employee.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Society</InputLabel>
          <Select name="id_societies" value={formData.id_societies} onChange={handleChange} fullWidth>
            <MenuItem value="">Select Society</MenuItem>
            {societies.map((society) => (
              <MenuItem key={society.id} value={society.id}>{society.company_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select name="id_departments" value={formData.id_departments} onChange={handleChange} fullWidth>
            <MenuItem value="">Select Department</MenuItem>
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>{department.description}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

