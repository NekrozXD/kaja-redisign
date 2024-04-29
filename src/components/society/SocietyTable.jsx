import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col,Card,Button } from "react-bootstrap"
import './society.scss'


export const SocietyTable = ( {societies, editSociety, deleteSociety} ) => {
return (
    <div >
        <div style={{width:'100%'}} className="society-table">
            <table style={{width:"100%" ,background:'transparent', textAlign:'center'}}>
                <thead>
                 <tr>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Company Email</th>
                    <th>Nif</th>
                    <th>Stat</th>
                    <th>Logo</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody >
                     {societies.map((society, id) => (
                    <tr key={id}>
                    <td>{society.company_name}</td>
                    <td>{society.address}</td>
                    <td>{society.company_email}</td>
                    <td>{society.nif}</td>
                    <td className="col-md-1">{society.stat}</td>
                    <td className="col-md-1">
                 <img width="50px" src={`http://localhost:8000/storage/society/logo/${society.logo}`} alt="Society Logo" />
                     </td>
                     <td>    
                        <Button className="edit" variant="primary" onClick={() => editSociety(society)}><FontAwesomeIcon icon={faEdit}/></Button>
                        <span>&nbsp;</span>
                        <Button className= "delete" variant="danger" onClick={() => deleteSociety(society.id)}>
                                <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </td>
                </tr>
                ))
                }
                    </tbody>
                </table>
         </div>
        </div>
 )
}