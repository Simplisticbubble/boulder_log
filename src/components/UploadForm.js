import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const UploadForm = ({ onUpload }) => {
 const [selectedFile, setSelectedFile] = useState();
 const [notes, setNotes] = useState('');
 const [location, setLocation] = useState('');
 const [grade, setGrade] = useState('');

 const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
 };

 const fileUploadHandler = () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    // Generate a unique identifier (e.g., using a timestamp)
    const uniqueId = Date.now();
    // Create a new File object with the unique identifier appended to the original file name
    const newFile = new File([selectedFile], `${uniqueId}-${selectedFile.name}`, {
      type: selectedFile.type,
    });

    const fd = new FormData();
    fd.append('image', newFile);
    fd.append('notes', notes);
    fd.append('location', location);
    fd.append('grade', grade);
    axios.post('http://localhost:5000/upload', fd)
      .then(res => {
        console.log(res);
        onUpload();
      })
      .catch(err => {
        console.error(err);
      });
 };

 return (
    <div className='upload_section'>
      <input
        type="file"
        id="fileInput"
        onChange={fileSelectedHandler}
        multiple
        style={{ display: 'none' }}
      />
       <label htmlFor="fileInput" className="file-upload-button">Upload File</label>
      <textarea className='upload_section_textarea'
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter notes for the image"
      />
      <textarea className = 'upload_section_location'
        value = {location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location for the image"
      />
      <textarea className = 'upload_section_grade'
        value = {grade}
        onChange={(e) => setGrade(e.target.value)}
        placeholder="Enter grade for the image"
      />
      <button className = "upload_button" onClick={fileUploadHandler}>Upload!</button>
    </div>
 );
};

export default UploadForm;
