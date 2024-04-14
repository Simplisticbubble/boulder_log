// App.js
import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import ImageList from './components/ImageList';
import axios from 'axios';
import './App.css';
import { FaPlus } from 'react-icons/fa';



const App = () => {
 const [images, setImages] = useState([]);
 const [isModalOpen, setIsModalOpen] = useState(false);


 useEffect(() => {
    fetchImages();
 }, []);

 const fetchImages = () => {
    axios.get('http://localhost:5000/images')
      .then(res => {
        setImages(res.data);
      });
 };
 const deleteImage = (filename) => {
   // Send a DELETE request to your server
   axios.delete(`http://localhost:5000/images/${filename}`)
       .then(() => {
            console.log(filename);
           // On success, filter out the deleted image from the local state
           const newImages = images.filter(image => image.filename !== filename);
           setImages(newImages);
           // Optionally, display a success message or perform other actions
       })
       .catch(error => {
           // Handle any errors that occur during the DELETE request
           console.error('Error deleting image:', error);
       });
};

 const handleUpload = () => {
    // Re-fetch images after an upload
    fetchImages();
    setIsModalOpen(false);
 };
 const openModal = () => {
   setIsModalOpen(true);
 }
 const closeModal = ()=> {
   setIsModalOpen(false);
 }



 return (
   <>
   <div className='top_section'>
      <div className='modal_header'>
         <button  type='button' className='modal_button' onClick={openModal}><FaPlus /></button>
         {isModalOpen && (
            <dialog className='header' open>
               <UploadForm onUpload={handleUpload} />
               <button type='button' className='modal_close' onClick={closeModal}>Close</button>
            </dialog>
         )}
      </div>
      <div className='title'>
         <h1>Your Climbs</h1>
         <p>Logged Climbs</p>
      </div>
   </div>
    <div>
      <ImageList images={images} onDelete={deleteImage}/> {/* Pass images as a prop */}
    </div>
    </>
 );
};

export default App;