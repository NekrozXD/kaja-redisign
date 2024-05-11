import React from 'react';
import styled from 'styled-components';
import './Employee.scss'

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
`;

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9998;
`;

export const WorkhourLinesModal = ({ show, handleClose, workhourlines, workhourName, totalHours, employeeName, employeeFirstName }) => {
    return (
        <>
            {show && (
                <div className='modal'>
                    <ModalBackdrop onClick={handleClose} />
                    <ModalWrapper>
                        <h2>Workhour Lines - {workhourName} ({employeeName} {employeeFirstName})</h2>
                        <p>Total Hours: {totalHours} hours</p>
                        <table>
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
                                {workhourlines && workhourlines && workhourlines.map((line, index) => (
                                    <tr key={index}>
                                        <td>{line.jour}</td>
                                        <td>{line.checkin_am}</td>
                                        <td>{line.checkout_am}</td>
                                        <td>{line.checkin_pm}</td>
                                        <td>{line.checkout_pm}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handleClose}>Close</button>
                    </ModalWrapper>
                </div>
            )}
        </>
    );
};

