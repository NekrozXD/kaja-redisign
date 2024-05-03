import React, { useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import './Employee.scss';

export const CsvImport = ({ employees, updateEmployeeAction, fetchData, toast, departments, societies, workhours, onImportComplete }) => {
    const [parsedData, setParsedData] = useState([]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = async (e) => {
            const csv = e.target.result;
            const lines = csv.split('\n').filter(line => line.trim() !== ''); 
            const headers = lines[0].split(';'); 
    
            const data = [];
            for (let i = 1; i < lines.length; i++) {
                const row = lines[i].split(';');
                data.push(row);
            }
    
            setParsedData(data);
        };
    
        reader.readAsText(file);
    };

    const importData = async () => {
        const employeesToAdd = parsedData.map(row => ({
            name: row[0], 
            firstname: row[1], 
            matricule: row[2],
            id_departments: row[3], 
            id_societies: row[4],
            id_work_hours: row[5], 
        }));

        try {
            await Promise.all(employeesToAdd.map(employee => axios.post('http://localhost:8000/api/employees', employee)));
            fetchData();
            toast.success('Employees added successfully!');
            onImportComplete(); 
        } catch (error) {
            console.error('Failed to add employees from CSV:', error);
            toast.error('Failed to add employees from CSV');
        }
    };

    return (
        <div className='csv'>
            <header> 
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <button onClick={importData} disabled={parsedData.length === 0}>Import Data</button></header>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>First Name</th>
                        <th>Matricule</th>
                        <th>Department</th>
                        <th>Society</th>
                        <th>Work Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {parsedData.map((row, index) => (
                        <tr key={index}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>
                                <select
                                    value={row[3]}
                                    onChange={(e) => {
                                        const newData = [...parsedData];
                                        newData[index][3] = e.target.value;
                                        setParsedData(newData);
                                    }}
                                >
                                    {departments.map(department => (
                                        <option key={department.id} value={department.id}>
                                            {department.coded}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={row[4]}
                                    onChange={(e) => {
                                        const newData = [...parsedData];
                                        newData[index][4] = e.target.value;
                                        setParsedData(newData);
                                    }}
                                >
                                    {societies.map(society => (
                                        <option key={society.id} value={society.id}>
                                            {society.company_name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={row[5]}
                                    onChange={(e) => {
                                        const newData = [...parsedData];
                                        newData[index][5] = e.target.value;
                                        setParsedData(newData);
                                    }}
                                >
                                    {workhours && workhours.workhours && workhours.workhours.map(workhour => (
                                        <option key={workhour.id} value={workhour.id}>
                                            {workhour.nom}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
};

