import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import './User.scss';
import { UserDialog } from './UserDialog';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export const UserComponent = () => {
  const [isEditing, setIsEditing] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    id_employees: "",
    id_departments: "",
    id_societies: ""
  });
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchSocieties();
    fetchEmployees();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
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

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/employees");
      setEmployees(response.data.employees);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/departments');
          setDepartments(response.data.departments);
      } catch (error) {
          console.error('Failed to fetch departments:', error);
      }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        console.log("Editing user data:", userData);
        await axios.put(`http://localhost:8000/api/users/${userData.id}`, userData);
        Swal.fire({
          icon: 'success',
          title: 'User updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.log("Adding user data:", userData);
        await axios.post("http://localhost:8000/api/users", userData);
        Swal.fire({
          icon: 'success',
          title: 'User created successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
      fetchUsers();
      setUserData({
        name: "",
        email: "",
        password: "",
        role: "",
        id_employees: "",
        id_departments: "",
        id_societies: ""
      });
      setIsEditing(null);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update/create user. Please try again later.'
      });
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setIsEditing(userId);
    setUserData(userToEdit);
    setDialogOpen(true);
  };

  const handleDelete = async (userId) => {
    const isConfirmed = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You are about to delete this user. This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (isConfirmed.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`);
        fetchUsers();
        Swal.fire({
          icon: 'success',
          title: 'User deleted successfully',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete user. Please try again later.'
        });
      }
    }
  };
        return (
            <div className="user">
             <header style={{backgroundColor:'var(--thead-bg-color)', padding: '10px', textAlign: 'center', color: 'white', fontWeight: 'bolder', display:'flex' , textAlign:'center', justifyContent:'center', alignItems:'center', color:'var(--base-text-color)'}}>
             <p style={{padding:'15px', backgroundColor:'var(--primary-color)', color:'white', borderRadius:'4px', width:'80%'}} >User List</p> 
                <button style={{ marginLeft:'auto', padding:'15px', backgroundColor:'var(--blue-color)',color:'white', borderRadius:'4px' }} onClick={() => setDialogOpen(true)}>Add user</button>
                </header>             
              <div>
            <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Society</th>
                      <th>Departement</th>  
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.society.company_name}</td>
                          <td>{user.department.coded}</td>
                          <td>
                            <button className='edit' onClick={() => handleEdit(user.id)}>< FontAwesomeIcon icon={faEdit} color="white"/></button>
                            <button className='delete' onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash}color="white"/></button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <UserDialog
                open={dialogOpen}
                onClose={() => {
                  setDialogOpen(false);
                  setUserData({
                    name: "",
                    email: "",
                    password: "",
                    role: "",
                    id_employees: "",
                    id_departments: "",
                    id_societies: ""
                  });
                  setIsEditing(null);
                }}
                userData={userData}
                departments={departments}
                employees={employees}
                societies={societies}
                onSubmit={handleSubmit}
                onChange={handleChange}
              />
            </div>          
      );
      
};
