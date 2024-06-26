// AreaTop.jsx

import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MdOutlineMenu } from 'react-icons/md';
import { SidebarContext } from '../../../context/SidebarContext';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import './AreaTop.scss';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AreaTop = ({ onDepartmentSelect, onDateRangeSelect }) => {
  const { openSidebar } = useContext(SidebarContext);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    onDepartmentSelect(e.target.value); 
  };
  
  const handleDateRangeSelect = (ranges) => {
    setState([ranges.selection]);
    onDateRangeSelect(ranges.selection); // Pass the selected date range
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/departments')
      .then(response => {
        setDepartments(response.data.departments);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button className="sidebar-open-btn" type="button" onClick={openSidebar}>
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title">Dashboard</h2>
      </div>
      <div className="area-top-m">
        <div className="area-top-label">
          <label id="department-label">Department:</label>
        </div>
        <span>&nbsp;</span>
        <FormControl>
          <Select
            labelId="department-label"
            id="departmentSelect"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            fullWidth
            style={{ width: '200px' }} 
          >
            <MenuItem value="">
              <em>Select Department</em>
            </MenuItem>
            <MenuItem value='all'>
              <em>all</em>
              </MenuItem>
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.coded}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>  
      <div className="area-top-r">
        <div
          ref={dateRangeRef}
          className={`date-range-wrapper ${!showDatePicker ? 'hide-date-range' : ''}`}
          onClick={handleInputClick}
        >
         <DateRange
        editableDateInputs={true}
        onChange={(item) => handleDateRangeSelect(item)} // Use handleDateRangeSelect here
        moveRangeOnFirstSelection={false}
        ranges={state}
        showMonthAndYearPickers={false}
      />

        </div>
      </div>
    </section>
  );
};

export default AreaTop;
