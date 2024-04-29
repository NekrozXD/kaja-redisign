import WorkhourForm from "../../components/workhour/WorkhourComponent";
import WorkhourMapping from "../../components/workhour/workhourList";
import { faArrowUp,faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const WorkhourScreen = () => {
    const [open, setOpen] = useState(true);

    const toggleFormVisibility = () => {
        setOpen(!open);
    };

    return (
        <>
            <button style={{marginBottom:'10px', marginLeft:'auto', position:'absolute', right:'5%', top:'4%'}} onClick={toggleFormVisibility}>
                {open ? (
                       <span style={{backgroundColor:'var(--blue-color)', padding:'5px', borderRadius:'4px',color:'white',width:'10vw'}}>
                       <FontAwesomeIcon icon={faArrowUp} /> hide
                       </span>
                ) : ( 
                    <span style={{backgroundColor:'var(--blue-color)', padding:'5px', borderRadius:'4px',color:'white',width:'10vw'}}>
                    <FontAwesomeIcon icon={faArrowDown} /> create workhour
                    </span>
                )}
            </button>
            {open && <WorkhourForm />}
            <WorkhourMapping />
        </>
    );
};
