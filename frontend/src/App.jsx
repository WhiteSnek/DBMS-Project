import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const App = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState([]);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get(`${API_URL}/colleges`);
      setColleges(response.data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const handleViewDetails = async (collegeId) => {
    
    try {
      const response = await axios.get(`${API_URL}/colleges/${collegeId}/departments`);
      console.log(response)
      setSelectedCollege(response.data);
    } catch (error) {
      console.error('Error fetching college details:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">College Management System</h1>
      <div className="grid grid-cols-3 gap-4">
        {colleges.map((college) => (
          <div key={college.CollegeID} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">{college.Name}</h2>
            <p>{college.Address}</p>
            <p>Contact Nos: {college.ContactNos}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={() => handleViewDetails(college.CollegeID)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      {selectedCollege && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-2">College Details:</h2>
    {selectedCollege.map((college) => (
      <div key={college.CollegeID} className="border p-4 rounded-md mb-4">
        <p>Name: {college.Name}</p>
        <p>HOD: {college.HeadOfDepartment}</p>
        <p>Department Id: {college.DepartmentID}</p>
        <p>Contact no: {college.ContactNo}</p>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default App;
