import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';
import { toast,ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export const SocietyDialog = ({ open, handleClose, society,editSociety, isEditing, setIsEditing,id}) => {

    const [company_name, setCompany_name] = useState("")
    const [address, setAddress] = useState("")
    const [company_email, setCompany_email] = useState("")
    const [nif, setNif] = useState("")
    const [stat, setStat] = useState("")
    const [logo, setLogo] = useState()
    const [validationError,setValidationError] = useState({})
    const [societies, setSocieties] = useState();

    const changeHandler = (event) => {
          setLogo(event.target.files[0]);
      };
  
    const createSociety = async (e) => {
      e.preventDefault();
  
      const formData = new FormData()
  
      formData.append('company_name', company_name)
      formData.append('address', address)
      formData.append('company_email', company_email)
      formData.append('nif', nif)
      formData.append('stat', stat)
      formData.append('logo', logo)
  
      await axios.post(`http://localhost:8000/api/societies`, formData).then(({data})=>{

        toast.success('Society created successfully');
      }).catch(({response})=>{
        if(response.status===422){
          setValidationError(response.data.errors)
        }else{
          Swal.fire({
            text:response.data.message,
            icon:"error"
          })
        }
      })
    }

      const updateSociety = async (e) => {
        e.preventDefault();
    
        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('company_name', company_name)
        formData.append('address', address)
        formData.append('company_email', company_email)
        formData.append('nif', nif)
        formData.append('stat', stat)
        if(logo!==null){
          formData.append('logo', logo)
        }
    
        await axios.post(`http://localhost:8000/api/societies/${id}`, formData).then(({data})=>{
          Swal.fire({
            icon:"success",
            text:data.message,
            
          })
          toast.info('Society updated successfully');
        }).catch(({response})=>{
          if(response.status===422){
            setValidationError(response.data.errors)
          }else{
            Swal.fire({
              text:response.data.message,
              icon:"error"
            })
          }
        })
    }
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
          updateSociety(e);
        } else {
          createSociety(e);
        }
        handleClose();
      };
      
       useEffect(() => {
        if (isEditing) {
        setCompany_name(society.company_name || "");
        setAddress(society.address || "");
        setCompany_email(society.company_email || "");
        setNif(society.nif || "");
        setStat(society.stat || "");
        setLogo(society.logo || null);
        }
        else{

        }
    }, [society]);


    const handleCloseDialog = () => {
        setIsEditing(false);
        setCompany_name("");
        setAddress("");
        setCompany_email("");
        setNif("");
        setStat( "");
        setLogo("");
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? "Edit Society" : "Create Society"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                <TextField
                    label="Company Name"
                    value={company_name}
                    onChange={(e) => setCompany_name(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Company Email"
                    value={company_email}
                    onChange={(e) => setCompany_email(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="NIF"
                    value={nif}
                    onChange={(e) => setNif(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Stat"
                    value={stat}
                    onChange={(e) => setStat(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <input type="file" onChange={changeHandler} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleSubmit}>
                      {isEditing ? 'Modify society' : "Add society"}
                </Button>
            </DialogActions>
            <ToastContainer position="top-center" autoClose={3000} />
        </Dialog>
    );
};
