    import { useState,useEffect } from "react";
    import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { updateSociety } from "./SocietyAction";

    export const SocietyDialog = ({ open, handleClose, handleSave, society, isEditing,editSociety,setIsEditing }) => {
        const [company_name, setCompany_name] = useState(society.company_name || "");
        const [address, setAddress] = useState(society.address || "");
        const [company_email, setCompany_email] = useState(society.company_email || "");
        const [nif, setNif] = useState(society.nif || "");
        const [stat, setStat] = useState(society.stat || "");
        const [logo, setLogo] = useState(society.logo || null);    

        const handleSaveClick = () => {
            const formData = new FormData();
            formData.append('company_name', company_name || '');
            formData.append('address', address || '');
            formData.append('company_email', company_email || '');
            formData.append('nif', nif || '');
            formData.append('stat', stat || '');
            formData.append('logo', logo);
            console.log("Form data:", {
                company_name,
                address,
                company_email,
                nif,
                stat,
                logo
            });
            handleSave(formData);
            if (isEditing) {
                editSociety({
                    ...society,
                    company_name,
                    address,
                    company_email,
                    nif,
                    stat,
                    logo
                });
            }
        };

        useEffect(() => {
            console.log(`Dialog ${isEditing ? 'Edit' : 'Create'} Mode`);
        }, [open, isEditing]);
    
        
    useEffect(() => {
        setCompany_name(society.company_name || "");
        setAddress(society.address || "");
        setCompany_email(society.company_email || "");
        setNif(society.nif || "");
        setStat(society.stat || "");
        setLogo(society.logo || null);
    }, [society]);

        const handleLogoChange = (e) => {
            setLogo(e.target.files[0]);
        };
        
        const handleCloseDialog = () => {
            setIsEditing(false);
            handleClose();
        }
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditing ? "Edit Society" : "Create Society"}</DialogTitle>
                <DialogContent>
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
                    <input type="file" onChange={handleLogoChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleSaveClick} color="primary">
                            {isEditing ? "Save Changes" : "Create"}
                        </Button>
                </DialogActions>
            </Dialog>
        );
    };
