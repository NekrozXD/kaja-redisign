            import { useState, useEffect } from "react";
            import { Card, Button } from "react-bootstrap";
            import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
            import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
            import { toast, ToastContainer } from "react-toastify";
            import "react-toastify/dist/ReactToastify.css";
            import { SocietyTable } from "./SocietyTable";
            import Swal from "sweetalert2";
            import axios from 'axios';
            import { createSociety, updateSociety, fetchSocieties, deleteSociety } from "./SocietyAction.js";
            import { SocietyDialog } from "./SocietyMaterialDialog";
            import './society.scss'

            export const SocietyComponent = () => {

                const [company_name, setCompany_name] = useState("");
                const [address, setAddress] = useState("");
                const [company_email, setCompany_email] = useState("");
                const [nif, setNif] = useState("");
                const [stat, setStat] = useState("");
                const [logo, setLogo] = useState();
                const [societies, setSocieties] = useState([]);
                const [isEditing, setIsEditing] = useState(null);
                const [open, setOpen] = useState(false);
                const [id, setId] = useState([]);

                const handleOpenDialog = () => {
                    setOpen(true);
                };

                const handleCloseDialog = () => {
                    setOpen(false);
                };
                const handleUpdate = async () => {
                    try {
                        const formData = {
                            company_name,
                            address,
                            company_email,
                            nif,
                            stat,
                            logo
                        };
                        console.log("Form data to put:", formData);   
                        console.log('id: ',id)  
                        await updateSociety(id, formData);
                        toast.success("Society updated successfully");
                        handleCloseDialog();
                        fetchAllSocieties();
                        clearForm();
                    } catch (error) {
                        console.error("Failed to update society: ", error);
                        toast.error("Failed to update society");
                    }
                };
                
                const handleCreate = async () => {
                    try {
                        const formData = {
                            company_name,
                            address,
                            company_email,
                            nif,
                            stat,
                            logo
                        };
                        await createSociety(formData);
                        toast.success("Society created successfully");
                        handleCloseDialog();
                        fetchAllSocieties();
                        clearForm();
                    } catch (error) {
                        console.error("Failed to create society: ", error);
                        toast.error("Failed to create society");
                    }
                };
                
                const handleSubmit = isEditing ? handleUpdate : handleCreate;
                
                
                useEffect(() => {
                    fetchAllSocieties();
                }, []);

                const fetchAllSocieties = async () => {
                    try {
                        const data = await fetchSocieties();
                        setSocieties(data);
                    } catch (error) {
                        console.error("Failed to fetch societies: ", error);
                    }
                };

                const handleDelete = async (id) => {
                    const isConfirmed = await Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    });
                
                    if (isConfirmed.isConfirmed) {
                        try {
                            await deleteSociety(id);
                            toast.success("Society deleted successfully");
                            fetchAllSocieties();
                        } catch (error) {
                            console.error("Failed to delete society: ", error);
                        }
                    }
                };

                const handleEdit = (society) => {
                    setId(society.id);
                    setCompany_name(society.company_name || "");
                    setAddress(society.address || "");
                    setCompany_email(society.company_email || "");
                    setNif(society.nif || "");
                    setStat(society.stat || "");
                    setLogo(society.logo || "");
                    setIsEditing(society.id);
                    setOpen(true);
                };
                

                const clearForm = () => {
                    setCompany_name("");
                    setAddress("");
                    setCompany_email("");
                    setNif("");
                    setStat("");
                    setLogo(null);
                    setIsEditing(null);
                };

                return (
                    <div className= 'society' style={{backgroundColor:'var(--secondary-color)', padding:'15px', maxHeight:'90vh', minHeight:'90vh', width:'100%'}}>
                        <div>          
                            <SocietyDialog
                                open={open}
                                handleClose={handleCloseDialog}
                                handleSave={handleSubmit}
                                society={{
                                    company_name,
                                    address,
                                    company_email,
                                    nif,
                                    stat,
                                    logo
                                }}
                                isEditing={isEditing}
                                editSociety={handleEdit}
                                setIsEditing={setIsEditing}
                            />
                        </div>
                        <div>
                            <header style={{backgroundColor:'var(--thead-bg-color)', padding: '10px', textAlign: 'center', color: 'white', fontWeight: 'bolder', display:'flex' , textAlign:'center', justifyContent:'center', alignItems:'center', color:'var(--base-text-color)'}}>
                                <p style={{padding:'15px', backgroundColor:'var(--primary-color)', color:'white', borderRadius:'4px', width:'80%'}} >Society List</p> 
                                <Button style={{justifyContent:'flex-end', alignItems:'flex-end', marginLeft:'auto', padding:'15px', backgroundColor:'var(--blue-color)', color:'white', borderRadius:'4px'}} onClick={handleOpenDialog}>Add Society</Button> 
                            </header>             
                            <SocietyTable societies={societies} editSociety={handleEdit} deleteSociety={handleDelete} />
                        </div>
                        <ToastContainer />
                    </div>
                );
            };

