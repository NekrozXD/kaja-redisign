import AreaTableAction from "./AreaTableAction";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Employee",
  "status",
  "Date",
  "checkin",
  "checkout",
  "Action",
];

const TABLE_DATA = [
  {
    id: 100,
    name: "Jean",
    statut: 'absent',
    date: "Jun 29,2022",
    checkin: "07:50 am",
    checkout: "17:00 pm",
    arrival: "not arrived"
  },
  {
    id: 101,
    name: "jane",
    statut: 'absent',
    date: "Jun 29,2022",
    checkin: "07:50 am",
    checkout: "17:00 pm",
    arrival: "not arrived"
  },
  {
    id: 102,
    name: "josh guista",
    statut: 'absent',
    date: "Jun 29,2022",
    checkin: "07:50 am",
    checkout: "17:00 pm",
    arrival: "not arrived"
  },
  {
    id: 103,
    name: "Ariana Grande",
    statut: 'absent',
    date: "Jun 29,2022",
    checkin: "07:50 am",
    checkout: "17:00 pm",
    arrival: "not arrived"
  },
  {
    id: 104,
    name: "David Gueto",
    statut: 'absent',
    date: "Jun 29,2022",
    checkin: "07:50 am",
    checkout: "17:00 pm",
  arrival: "not arrived"  },
  {
    id: 105,
    name: "Jojo",
    statut: 'absent',
    date: "Jun 29,2022",
    checkin: "07:50 am",
    checkout: "17:00 pm",
  arrival: "not arrived"  },
];
const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Attendance</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead style={{ textAlign: 'center' }}>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td style={{width:'250px'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div style={{ marginLeft: '25px', border:'1px solid grey', height:'50px', width:'50px', borderRadius:'50%', alignItems:'center', justifyContent:'center', display:'flex' , backgroundColor:'var(--thead-bg-color)'}}>
                      <FontAwesomeIcon color={'grey'} icon={faUser} />
                    </div>      
                    <div style={{marginLeft:'5px', padding:'15px'}}>{dataItem.name}</div>                                     
                    </div>
                  </td>
                  <td style={{ width: '200px' }}>
                    <div className="div-status" style={{background:'var(--gradient)', width: '200px', display: 'flex', alignItems: 'center', textAlign: 'center', borderRadius: '4px', padding: '15px' }}>
                      <span><p>Arrival: </p><p>{dataItem.arrival}</p></span>
                      <span style={{ border: '1px solid #0e574f', marginLeft: 'auto', padding: '5px', borderRadius: '4px', backgroundColor: 'red', color: 'white' }}>{dataItem.statut}</span>
                    </div>
                  </td>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.checkin}</td>
                  <td>
                    <div className="dt-checkout">
                      <span
                        className={`dt-checkout-dot dot-${dataItem.checkout}`}
                      ></span>
                      <span className="dt-checkout-text">{dataItem.checkout}</span>
                    </div>
                  </td>
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
