import React from 'react';
import './style.css';

const Image = ({ image, onMouseEnter, onMouseLeave }) => {
    return (
       <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
         <img src={image.url} alt={image.name} />
       </div>
    );
   };
export default Image;