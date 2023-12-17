/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export default function Card({ imageUrl, name, handleOnClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleOnLoad = () => {
    setImageLoaded(true);
  };

  
  useEffect(() => {
    let image = new Image();
    image.src = imageUrl;
    image.onload = handleOnLoad;
    return () => {
      image.onload = null;
    };
  });

  return (
    <div>
      {!imageLoaded ? (
        <div> Loading ... </div>
      ) : (
        <img
          className='card'
          src={imageUrl}
          onLoad={handleOnLoad}
          onClick={() => handleOnClick(name)}
        />
      )}
    </div>
  );
}
