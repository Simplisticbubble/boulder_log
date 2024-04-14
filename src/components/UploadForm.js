import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const UploadForm = ({ onUpload }) => {
 const [selectedFile, setSelectedFile] = useState();
 const [values, setValues] = useState({
  location: "",
  grade: "",
  notes: "",
 })

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
    fd.append('notes', values.notes);
    fd.append('location', values.location);
    fd.append('grade', values.grade);
    axios.post('http://localhost:5000/upload', fd)
      .then(res => {
        console.log(res);
        onUpload();
      })
      .catch(err => {
        console.error(err);
      });
 };
 const onChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
};

 return (
    <div className='upload_section'>
      <form className = "form_section" onSubmit={fileUploadHandler}>
        <div className = "button_section">
        <input
          type="file"
          id="fileInput"
          onChange={fileSelectedHandler}
          multiple
          style={{ display: 'none' }}
        />
        <label htmlFor="fileInput" className="file-upload-button">Upload File</label>
        </div>
        <label className = 'upload_section_lable'>location</label>
        <input className = 'upload_section_smallInput'
          name="location"
          value = {values.location}
          onChange={onChange}
          placeholder="Enter location for the image"
        />
        <label className = 'upload_section_lable'>grade</label>
        <input className = 'upload_section_smallInput'
          name="grade"
          value = {values.grade}
          onChange={onChange}
          placeholder="Enter grade for the image"
        />
        <label className = 'upload_section_lable'>notes</label>
        <input className='upload_section_textarea'
          name="notes"
          value={values.notes}
          onChange={onChange}
          placeholder="Enter notes for the image"
        />
        
        <div className='button_section'>
          <button className = "upload_button">Upload!</button>
        </div>
        
      </form>
    </div>
 );
};

export default UploadForm;
