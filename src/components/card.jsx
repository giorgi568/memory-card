/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

export default function Card({ imageUrl, name, handleOnClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleOnLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setImageLoaded(false);
    let image = new Image();
    image.src = imageUrl;
    image.onload = handleOnLoad;
    return () => {
      image.onload = null;
    };
  }),
    [imageUrl];

  return (
    <div>
      {console.log(555555555555555)}
      {!imageLoaded ? (
        <div className='card'> Loading ... </div>
      ) : (
        <Tilt>
          <img
            className='card'
            src={imageUrl}
            onLoad={handleOnLoad}
            onClick={() => handleOnClick(name)}
            style={{opacity: imageLoaded ? '1' : '0', transition: 'opacity 1s ease-in-out'}}
          />
        </Tilt>
      )}
    </div>
  );
}
