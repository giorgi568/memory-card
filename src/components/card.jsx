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
  }, [imageUrl]);

  return (
    <div>
      {!imageLoaded ? (
        <h3 className='card'> Loading ... </h3>
      ) : (
        <Tilt glareEnable='true'>
          <img
            className='card'
            src={imageUrl}
            onLoad={handleOnLoad}
            onClick={() => {
              handleOnClick(name);
            }}
          />
        </Tilt>
      )}
    </div>
  );
}
