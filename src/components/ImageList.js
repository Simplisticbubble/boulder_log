import React, { useState } from 'react';
import './style.css';


const ImageList = ({ images, notes }) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [borderClass, setBorderClass] = useState('');

  const handleMouseClick = (image) => {
     setHoveredImage(image);
     
  };
  const handleMouseEnter = (image) => {
    setBorderClass(`${image.grade}-border`);
  }
 
  const handleMouseLeave = (event) => {
    event.stopPropagation();
     setHoveredImage(null);
     setBorderClass('');
  };
 

 
  return (
     <div className="image_square">
       {images.map((image, index) => (
         <div
           key={index}
           className={`image_square_div ${borderClass}`}
           onClick={() => handleMouseClick(image)}
           onMouseEnter={() => handleMouseEnter(image)}
            onMouseLeave={handleMouseLeave}
         >
           <img src={image.url} alt={image.filename}/>
           {hoveredImage === image && (
             <div className="notes-popup">
                <img src={image.url} alt={image.filename} />
                <p>{image.notes}</p> {/* Access the note using the index */}
                <p>Location: {image.location}</p>
                <p>Grade: {image.grade}</p>
                <button onClick={handleMouseLeave}>Close</button>
             </div>
           )}
         </div>
       ))}
     </div>
  );
 };

export default ImageList;