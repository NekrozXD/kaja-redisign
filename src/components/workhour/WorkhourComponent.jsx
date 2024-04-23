import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
// import { Toast,ToastContainer } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './workhour.scss'

const WorkhourForm = ({t}) => {
    const [workhourData, setWorkhourData] = useState({
        nom: '',
        total_hour:'1',
        delay_tolerance: ''
    });
    const [selectedDays, setSelectedDays] = useState([]);
    const [showWorkhourLineInputs, setShowWorkhourLineInputs] = useState(false);
    const [createdWorkhour, setCreatedWorkhour] = useState(null);
    const [isLoading, setIsLoading] = useState(false);  

    const handleInputChange = (e) => {
        setWorkhourData({ ...workhourData, [e.target.name]: e.target.value });
    };

    const handleDaySelect = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/workhours', workhourData);
            setCreatedWorkhour(response.data.id);

            setShowWorkhourLineInputs(true);

            toast.success('workhour created succesfully');
        } catch (error) {
            console.error('Error creating workhour:', error);
            alert('An error occurred while creating workhour.');
        }
    };

    const handleCreateWorkhourLines = async () => {
        try {
            if (!createdWorkhour) {
                alert('Please create a workhour first.');
                return;
            }
            setIsLoading(true);
            for (const day of selectedDays) {
                const checkin_am = workhourData[`checkin_am_${day}`];
                const checkout_am = workhourData[`checkout_am_${day}`];
                const checkin_pm = workhourData[`checkin_pm_${day}`];
                const checkout_pm = workhourData[`checkout_pm_${day}`];
    
                if (!checkin_am || !checkout_am || !checkin_pm || !checkout_pm) {
                    alert('Please fill in all check-in and check-out times for each selected day.');
                    return;
                }
    
                console.log('Workhourline data:', {
                    jour: day,
                    checkin_am: workhourData[`checkin_am_${day}`],
                    checkout_am: workhourData[`checkout_am_${day}`],
                    checkin_pm: workhourData[`checkin_pm_${day}`],
                    checkout_pm: workhourData[`checkout_pm_${day}`],
                    id_work_hours: createdWorkhour
                });
    
                await axios.post('http://localhost:8000/api/workhourlines', {
                    jour: day,
                    checkin_am,
                    checkout_am,
                    checkin_pm,
                    checkout_pm,
                    id_work_hours: createdWorkhour
                });
            }
    
        const response = await axios.get(`http://localhost:8000/api/workhours/${createdWorkhour}`);
        const existingWorkhourData = response.data;
            console.log(existingWorkhourData)
        let totalMinutes = selectedDays.reduce((total, day) => total + calculateTotalMinutes(day), 0);
        let totalHours = totalMinutes / 60; 
        console.log('Total Hours:', totalHours);

        existingWorkhourData.total_hour = totalHours;
        await axios.put(`http://localhost:8000/api/workhours/${createdWorkhour}`, existingWorkhourData);

        
        }  catch (error) {
            console.error('Error creating workhourlines:', error);
            alert('An error occurred while creating workhourlines.');
        } finally {
            setIsLoading(false); // Set loading back to false after request completes
        }
        setCreatedWorkhour(null);
        setSelectedDays([]);
        setWorkhourData({
            nom: '',
            total_hour: '1',
            delay_tolerance: ''
        });
        // Swal.fire({
        //     title: "Success!",
        //     text: "Workhour created succesfully !!",
        //     icon: "success"
        //   });
        toast.success('workhour lines created succesfully');
    };
    
    const calculateTotalMinutes = (day) => {
        const checkin_am = workhourData[`checkin_am_${day}`];
        const checkout_am = workhourData[`checkout_am_${day}`];
        const checkin_pm = workhourData[`checkin_pm_${day}`];
        const checkout_pm = workhourData[`checkout_pm_${day}`];
    
        if (!checkin_am || !checkout_am || !checkin_pm || !checkout_pm) {
            console.log('Missing values for day:', day);
            return 0; 
        }

        const totalMinutesAM = (parseInt(checkout_am.split(':')[0]) * 60 + parseInt(checkout_am.split(':')[1])) -
            (parseInt(checkin_am.split(':')[0]) * 60 + parseInt(checkin_am.split(':')[1]));
    
        const totalMinutesPM = (parseInt(checkout_pm.split(':')[0]) * 60 + parseInt(checkout_pm.split(':')[1])) -
            (parseInt(checkin_pm.split(':')[0]) * 60 + parseInt(checkin_pm.split(':')[1]));
    
        // Total minutes for the day
        const totalMinutes = totalMinutesAM + totalMinutesPM;
    
        return totalMinutes;
    };
    return (
        <div className="workhour-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Enter workhour name"
                        name="nom"
                        value={workhourData.nom}
                        onChange={handleInputChange}
                    />
                </div>
    
                <div className="form-group">
                    <label>Delay tolerance:</label>
                    <input
                        type="text"
                        placeholder="Enter delay tolerance"
                        name="delay_tolerance"
                        value={workhourData.delay_tolerance}
                        onChange={handleInputChange}
                    />
                </div>
    
                <div className="form-group">
                    <label>Select days:</label>
                    <div className="row">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <div
                                key={day}
                                className={`day-checkbox ${selectedDays.includes(day) ? 'checked' : ''}`}
                                onClick={() => handleDaySelect(day)}
                            >
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                            </div>
                        ))}
                    </div>
                </div>
    
                <button type="submit">Create Workhour</button>
            </form>
    
            {showWorkhourLineInputs && (
                <>
                    <h2>Workhourlines</h2>
                    <table className="workhourlines">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Check-in AM</th>
                                <th>Check-out AM</th>
                                <th>Check-in PM</th>
                                <th>Check-out PM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedDays.map((day) => (
                                <tr key={day}>
                                    <td>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                                    <td>
                                        <input
                                            type="time"
                                            name={`checkin_am_${day}`}
                                            value={workhourData[`checkin_am_${day}`]}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="time"
                                            name={`checkout_am_${day}`}
                                            value={workhourData[`checkout_am_${day}`]}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="time"
                                            name={`checkin_pm_${day}`}
                                            value={workhourData[`checkin_pm_${day}`]}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="time"
                                            name={`checkout_pm_${day}`}
                                            value={workhourData[`checkout_pm_${day}`]}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleCreateWorkhourLines}>Create workhourlines</button>
                </>
            )}
            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );        
};

export default WorkhourForm;
