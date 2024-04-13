// App.js
import React, { useState, useEffect } from 'react';
import UploadForm from './components/UploadForm';
import ImageList from './components/ImageList';
import axios from 'axios';
import './App.css';



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
         <button type='button' className='modal_button' onClick={openModal}>Open Modal</button>
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
      <ImageList images={images}/> {/* Pass images as a prop */}
    </div>
    </>
 );
};

export default App;